import { NextResponse } from "next/server";
import { plannerAgent } from "@/agents/planner";
import { explainerAgent } from "@/agents/explainer";
import { UIPlan } from "@/types/plan";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body?.prompt) {
      return NextResponse.json(
        { error: "Prompt missing" },
        { status: 400 }
      );
    }

    const prompt: string = body.prompt;
    const previousPlan: UIPlan | undefined = body.previousPlan;

    const plan = await plannerAgent(prompt, previousPlan);
    const explanation = await explainerAgent(plan);

    return NextResponse.json({
      plan,
      explanation,
    });
  } catch (error) {
    console.error("API ERROR:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
