import { OpenAI } from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { text, targetLanguage } = await req.json();

    if (!text || !targetLanguage) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "Você é um tradutor profissional." },
        { role: "user", content: `Traduza o seguinte texto para ${targetLanguage}: ${text}` },
      ],
      temperature: 0.3,
    });

    const translated = completion.choices[0]?.message?.content;

    return NextResponse.json({ translated });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
