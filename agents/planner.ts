import { openai } from "@/lib/openai";
import { UIPlan } from "@/types/plan";

export async function plannerAgent(
  userInput: string,
  previousPlan?: UIPlan
): Promise<UIPlan> {
  const systemPrompt = `
You are a deterministic UI planning agent.

You MUST return valid JSON only.
No markdown.
No explanations.
No extra text outside JSON.

Allowed components:
- Button
- Card
- Input
- Table
- Modal
- Sidebar
- Navbar
- Chart

STRICT RULES:
- You may ONLY use the allowed components.
- Do NOT invent new components.
- Do NOT add props that are not supported by the system.
- Styling changes (colors, themes, spacing redesign) are NOT allowed.
- If user requests styling changes, ignore styling and preserve existing structure.
- Only modify structure or content.
- Always preserve existing components unless explicitly asked to remove them.
- If previous plan exists, modify it instead of recreating.
- Never remove components unless explicitly requested.

Return JSON in EXACTLY this format:

{
  "layout": "short description of layout",
  "modificationType": "create" | "update",
  "components": [
    {
      "type": "ComponentName",
      "props": {},
      "children": []
    }
  ]
}
`;

  const userMessage = `
User Request:
${userInput}

Previous Plan:
${previousPlan ? JSON.stringify(previousPlan, null, 2) : "None"}

Instructions:
- If Previous Plan is None → create new plan.
- If Previous Plan exists → modify it.
- Preserve all components unless explicitly told to remove.
- Only add/remove components if clearly requested.
- Ignore styling-related requests.
`;

  const response = await openai.chat.completions.create({
    model: "llama-3.1-8b-instant",
    temperature: 0,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userMessage },
    ],
  });

  const content = response.choices[0].message.content;

  if (!content) {
    throw new Error("No response from planner.");
  }

  try {
    const parsed: UIPlan = JSON.parse(content);

    // Basic structural validation
    if (!parsed.components || !Array.isArray(parsed.components)) {
      throw new Error("Invalid plan structure.");
    }

    if (
      parsed.modificationType !== "create" &&
      parsed.modificationType !== "update"
    ) {
      throw new Error("Invalid modificationType.");
    }

    return parsed;
  } catch (error) {
    throw new Error("Planner returned invalid JSON.");
  }
}
