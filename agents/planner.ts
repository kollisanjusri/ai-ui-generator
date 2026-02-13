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
No explanation.
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
- Only use allowed components.
- Do NOT invent new components.
- Do NOT add styling.
- Ignore color/theme/styling requests.
- Preserve existing components unless explicitly asked to remove.
- Modify previous plan instead of recreating when possible.

TABLE RULES:
If including a Table:
- It MUST include "columns" (string[])
- It MUST include "data" (array of objects)
- Each object must match column names.

Return JSON in this format:

{
  "layout": "short layout description",
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

  const userPrompt = `
User Input:
${userInput}

Previous Plan:
${previousPlan ? JSON.stringify(previousPlan) : "None"}

If Previous Plan exists:
- Modify it incrementally.
- Do not remove components unless explicitly requested.
`;

  const response = await openai.chat.completions.create({
    model: "llama-3.1-8b-instant",
    temperature: 0,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
  });

  const content = response.choices[0].message.content;

  if (!content) {
    throw new Error("Planner returned empty response.");
  }

  let parsed: UIPlan;

  try {
    parsed = JSON.parse(content);
  } catch {
    throw new Error("Planner returned invalid JSON.");
  }

  // ===== Basic Structure Validation =====

  if (!parsed.components || !Array.isArray(parsed.components)) {
    throw new Error("Invalid plan structure.");
  }

  if (
    parsed.modificationType !== "create" &&
    parsed.modificationType !== "update"
  ) {
    parsed.modificationType = previousPlan ? "update" : "create";
  }

  // ===== Deterministic Post-Processing Enforcement =====

  parsed.components.forEach((component: any) => {
    if (!component.props) component.props = {};

    // TABLE FIX
    if (component.type === "Table") {
      if (
        !component.props.columns ||
        !Array.isArray(component.props.columns)
      ) {
        component.props.columns = ["Name", "Email"];
      }

      if (
        !component.props.data ||
        !Array.isArray(component.props.data)
      ) {
        component.props.data = [
          { Name: "John Doe", Email: "john@example.com" },
          { Name: "Jane Doe", Email: "jane@example.com" },
        ];
      }
    }

    // MODAL FIX
    if (component.type === "Modal") {
      component.props.isOpen = component.props.isOpen ?? true;
    }

    // CHART FIX
    if (component.type === "Chart") {
      if (!component.props.data) {
        component.props.data = [
          { label: "Jan", value: 40 },
          { label: "Feb", value: 60 },
        ];
      }
    }
  });

  return parsed;
}
