"use client";

import { useState } from "react";
import { generateUI } from "@/agents/generator";
import { UIPlan } from "@/types/plan";

interface Version {
  id: number;
  plan: UIPlan;
  explanation: string;
}

export default function Home() {
  const [input, setInput] = useState("");
  const [plan, setPlan] = useState<UIPlan | null>(null);
  const [explanation, setExplanation] = useState("");
  const [versions, setVersions] = useState<Version[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function handleGenerate() {
    if (!input.trim()) return;

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: input,
        previousPlan: plan,
      }),
    });

    const data = await res.json();
    if (!data?.plan) return;

    setPlan(data.plan);
    setExplanation(data.explanation || "");

    const hasModal = data.plan.components.some(
      (c: any) => c.type === "Modal"
    );
    setIsModalOpen(hasModal);

    const newVersion: Version = {
      id: versions.length + 1,
      plan: data.plan,
      explanation: data.explanation,
    };

    setVersions((prev) => [...prev, newVersion]);
  }

  function handleRollback(id: number) {
    const version = versions.find((v) => v.id === id);
    if (!version) return;

    setPlan(version.plan);
    setExplanation(version.explanation);

    const hasModal = version.plan.components.some(
      (c: any) => c.type === "Modal"
    );
    setIsModalOpen(hasModal);
  }

  return (
    <div className="flex h-screen">
      {/* LEFT PANEL */}
      <div className="w-1/3 border-r p-6">
        <h2 className="text-xl font-semibold mb-4">AI Chat</h2>

        <textarea
          className="w-full border p-2 rounded mb-4"
          rows={5}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button
          onClick={handleGenerate}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Generate
        </button>

        <div className="mt-6">
          <h3 className="font-semibold mb-2">Versions</h3>

          {versions.length === 0 && (
            <p className="text-sm text-gray-500">
              No versions yet.
            </p>
          )}

          {versions.map((v) => (
            <div key={v.id} className="mb-2">
              <button
                onClick={() => handleRollback(v.id)}
                className="text-blue-600 underline"
              >
                Rollback to Version {v.id}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-2/3 p-6 overflow-auto">
        <h2 className="text-xl font-semibold mb-4">
          AI Explanation
        </h2>

        <div className="bg-gray-100 p-4 rounded mb-6">
          {explanation}
        </div>

        <h2 className="text-xl font-semibold mb-4">
          Live Preview
        </h2>

        {plan &&
          generateUI(
            plan.components,
            isModalOpen,
            () => setIsModalOpen(false)
          )}
      </div>
    </div>
  );
}
