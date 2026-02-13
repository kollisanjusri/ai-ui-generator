import { NextResponse } from "next/server";
import { plannerAgent } from "@/agents/planner";
import { explainerAgent } from "@/agents/explainer";

export async function POST(req: Request) {
  const { input, previousPlan } = await req.json();

  const plan = await plannerAgent(input, previousPlan);
  const explanation = await explainerAgent(input, plan);

  return NextResponse.json({
    plan,
    explanation,
  });
}
