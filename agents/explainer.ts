import { UIPlan } from "@/types/plan";

export async function explainerAgent(plan: UIPlan): Promise<string> {
  if (!plan || !plan.components) {
    return "No components were generated.";
  }

  const componentNames = plan.components.map(
    (c: any) => c.type
  );

  return `The system generated the following components: ${componentNames.join(
    ", "
  )}. The layout is set to "${plan.layout}".`;
}
