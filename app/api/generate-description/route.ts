import { NextResponse } from "next/server";
import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function POST(req: Request) {
  const { text } = await req.json();

  const prompt_pt = `Faca uma descricao, de tamanho medio, de dois paragrafos da ferramenta para developer:\n\n${text}\n\nDescrição:`;
  const prompt_en = `Make a medium description with two paragraphs of the tool for developers:\n\n${text}\n\nDescription:`;

//   const completion_pt = await openai.chat.completions.create({
//     model: "gpt-3.5-turbo",
//     messages: [{ role: "user", content: prompt_pt }],
//     temperature: 0.7,
//     max_tokens: 500,
//   });
//   const completion_en = await openai.chat.completions.create({
//     model: "gpt-3.5-turbo",
//     messages: [{ role: "user", content: prompt_en }],
//     temperature: 0.7,
//     max_tokens: 500,
//   });

const [completion_pt, completion_en] = await Promise.all([
  openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt_pt }],
    temperature: 0.7,
    max_tokens: 500,
  }),
  openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt_en }],
    temperature: 0.7,
    max_tokens: 500,
  }),
]);

  const description_pt = completion_pt.choices[0].message.content?.trim();
  const description_en = completion_en.choices[0].message.content?.trim();

  return NextResponse.json({ description_pt, description_en });
}
