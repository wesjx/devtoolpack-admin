import { UseFormReturn } from "react-hook-form"
import { FormFields } from "@/components/create-post" 

export async function handleTranslate(form: UseFormReturn<FormFields>, setIsLoading: (v: boolean) => void) {
  const { watch, setValue } = form

  const descEn = watch("description_en")
  const descPt = watch("description_pt")

  let source = ""
  let target = ""
  let targetField: "description_pt" | "description_en"

  if (descEn && !descPt) {
    source = descEn
    target = "português"
    targetField = "description_pt"
  } else if (descPt && !descEn) {
    source = descPt
    target = "english"
    targetField = "description_en"
  } else {
    alert("Preencha apenas um dos campos de descrição para traduzir.")
    return
  }

  setIsLoading(true)

  try {
    const res = await fetch("/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: source, targetLanguage: target }),
    })

    const data = await res.json()
    if (data.translated) {
      setValue(targetField, data.translated)
    } else {
      alert("Erro ao traduzir.")
    }
  } catch (error) {
    console.error("Erro ao traduzir:", error)
    alert("Erro ao traduzir.")
  } finally {
    setIsLoading(false)
  }
}