import { openai } from "@/lib/openai";
import { UIPlan } from "@/types/plan";

export async function explainerAgent(
  userInput: string,
  plan: UIPlan
): Promise<string> {
  const systemPrompt = `
You are a UI explanation agent.

Explain clearly in simple English:

- Why this layout was chosen
- Why each component was selected
- What the structure represents
- If modificationType is "update", explain what changed

Be concise but clear.
No markdown.
No JSON.
Just plain explanation text.
`;

  const response = await openai.chat.completions.create({
    model: "llama-3.1-8b-instant",
    temperature: 0,
    messages: [
      { role: "system", content: systemPrompt },
      {
        role: "user",
        content: `
User Request:
${userInput}

Generated Plan:
${JSON.stringify(plan, null, 2)}
`,
      },
    ],
  });

  return response.choices[0].message.content || "No explanation generated.";
}
