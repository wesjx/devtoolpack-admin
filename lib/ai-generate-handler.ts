import { UseFormReturn } from "react-hook-form"
import { FormFields } from "@/components/create-post"

export async function handleGenerateDescription(form: UseFormReturn<FormFields>, setIsLoading: (v: boolean) => void) {
  setIsLoading(true)
  const baseText = form.getValues("title")

  try {
    const res = await fetch("/api/generate-description", {
      method: "POST",
      body: JSON.stringify({ text: baseText }),
    })

    const data = await res.json()
    form.setValue("description_pt", data.description_pt)
    form.setValue("description_en", data.description_en)
  } catch (err) {
    console.error("Erro ao gerar descrição:", err)
    alert("Erro ao gerar descrição.")
  } finally {
    setIsLoading(false)
  }
}