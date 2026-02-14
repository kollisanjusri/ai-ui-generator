import { UIPlan } from "@/types/plan";

export async function plannerAgent(
  prompt: string,
  previousPlan?: UIPlan
): Promise<UIPlan> {

  // ✅ SAFETY FIX
  const lowerPrompt = (prompt || "").toLowerCase();

  let components: any[] = [];

  // Deterministic rules

  if (lowerPrompt.includes("dashboard")) {
    components.push({
      type: "Navbar",
      props: { title: "Dashboard" },
      children: [],
    });
  }

  if (lowerPrompt.includes("welcome")) {
    components.push({
      type: "Card",
      props: { title: "Welcome" },
      children: [],
    });
  }

  if (lowerPrompt.includes("modal")) {
    components.push({
      type: "Modal",
      props: { title: "Settings" },
      children: [],
    });
  }

  if (lowerPrompt.includes("table")) {
    components.push({
      type: "Table",
      props: {
        columns: ["Name", "Email"],
        data: [
          { Name: "John", Email: "john@test.com" },
           { Name: "Sanju", Email: "sanju@test.com" },
           { Name: "ryze", Email: "ryze@test.com" },
          { Name: "Jane", Email: "jane@test.com" },
        ],
      },
      children: [],
    });
  }

  return {
    modificationType: "create",
    layout: "main",
    components,
  };
}
