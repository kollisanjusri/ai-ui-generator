"use client";

import { useState } from "react";
import { generateUI, generateCodeString } from "@/agents/generator";
import {
  addVersion,
  getVersions,
  getVersion,
} from "@/store/versionStore";

export default function Home() {
  const [input, setInput] = useState("");
  const [plan, setPlan] = useState<any>(null);
  const [code, setCode] = useState("");
  const [explanation, setExplanation] = useState("");
  const [versionCount, setVersionCount] = useState(0);

  async function handleGenerate() {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input,
        previousPlan: plan,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error);
      return;
    }

    addVersion(data.plan);
    setVersionCount(getVersions().length);

    setPlan(data.plan);
    setExplanation(data.explanation);
    setCode(generateCodeString(data.plan));
  }

  function handleRollback(index: number) {
    const previous = getVersion(index);
    if (previous) {
      setPlan(previous);
      setCode(generateCodeString(previous));
    }
  }

  return (
    <div className="flex h-screen">
      {/* LEFT PANEL */}
      <div className="w-1/3 border-r p-6 space-y-4">
        <h2 className="text-lg font-semibold">AI Chat</h2>

        <textarea
          className="w-full border p-2 rounded"
          rows={4}
          placeholder="Describe your UI..."
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
          <h3 className="font-semibold">Versions</h3>
          <p>Total: {versionCount}</p>

          <div className="space-y-2 mt-2">
            {Array.from({ length: versionCount }).map((_, i) => (
              <button
                key={i}
                onClick={() => handleRollback(i)}
                className="block text-sm text-blue-600 underline"
              >
                Rollback to Version {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex-1 p-6 overflow-auto space-y-6">
        {explanation && (
          <div className="bg-gray-100 p-4 rounded">
            <h2 className="font-semibold mb-2">AI Explanation</h2>
            <p>{explanation}</p>
          </div>
        )}

        {code && (
          <div>
            <h2 className="font-semibold mb-2">Generated Code</h2>
            <textarea
              className="w-full h-64 border p-3 rounded font-mono text-sm"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
        )}

        <div>
          <h2 className="font-semibold mb-2">Live Preview</h2>
          {plan && generateUI(plan)}
        </div>
      </div>
    </div>
  );
}
