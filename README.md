# AI UI Generator — Deterministic Claude-Style Agent

This project is an AI-powered UI generator that converts natural language into working React UI using a fixed and deterministic component system.

It was built as part of the Ryze AI Full-Stack Assignment.

The focus of this project is correctness, determinism, and system design — not visual creativity.

---

## 🎯 What This Project Does

The system follows a structured pipeline:

Natural Language → Structured Plan → Generated React Code → Live Preview

A user can:
- Describe a UI in plain English
- See the UI rendered instantly
- Modify it iteratively
- Understand why the AI made certain decisions
- Roll back to previous versions

The system is designed to be safe, reproducible, and debuggable.

---

## 🧠 Agent Architecture

This system uses a multi-step agent design (not a single LLM call).

### 1️⃣ Planner Agent
The Planner:
- Interprets user intent
- Selects components from a fixed library
- Defines layout structure
- Outputs strict JSON
- Supports incremental edits
- Blocks styling-related changes

### 2️⃣ Generator
The Generator:
- Converts the structured plan into React components
- Uses only the predefined component library
- Renders live preview
- Converts the plan into readable React code

### 3️⃣ Explainer Agent
The Explainer:
- Describes why certain layout decisions were made
- Explains component selection
- Clarifies what changed during updates

This improves transparency and trust.

---

## 🔒 Deterministic Component System

All UI must use predefined components:

- Button  
- Card  
- Input  
- Table  
- Modal  
- Sidebar  
- Navbar  
- Chart  

The AI is NOT allowed to:
- Create new components
- Modify component styling
- Generate inline styles
- Generate arbitrary Tailwind classes
- Use external UI libraries

The AI may only:
- Select components
- Compose layouts
- Set predefined props
- Provide content

This guarantees visual consistency and reproducibility.

---

## 🔁 Iteration & Versioning

The system supports incremental updates.

When a user modifies the UI:
- The previous plan is passed back to the Planner
- Only necessary changes are made
- Existing components are preserved
- Full rewrites are avoided unless explicitly requested

Version history is stored in memory and users can:
- View total versions
- Roll back to previous states

---

## 🛡 Safety & Validation

The system includes real safeguards:

- Component whitelist enforcement
- Prop validation
- Table schema enforcement
- JSON structure validation
- Defensive rendering
- Server-side LLM execution
- API key isolation

Invalid AI outputs will not crash the application.

---

## 🖥 UI Structure

Left Panel:
- Chat input
- Generate button
- Version history
- Rollback controls

Right Panel:
- AI explanation
- Generated React code (editable)
- Live preview

This creates a Claude-style feedback loop between intent, code, and UI.

---

## 🧰 Tech Stack

Frontend:
- Next.js (App Router)
- React
- TypeScript

Backend:
- Next.js API Routes

AI:
- Groq LLM (OpenAI-compatible API)

Storage:
- In-memory version store

---

## 🚀 Setup Instructions

1. Clone the repository  
2. Install dependencies:

npm install

3. Create a `.env.local` file:

OPENAI_API_KEY=your_groq_api_key  
OPENAI_BASE_URL=https://api.groq.com/openai/v1

4. Start the development server:

npm run dev

5. Open:

http://localhost:3000

---

## ⚠ Known Limitations

- Edited code does not re-parse into the structured plan
- Version history is not persistent (in-memory only)
- Merge logic is prompt-based, not AST-based
- No streaming responses
- No diff visualization

---

## 🔮 What I Would Improve With More Time

- AST-based merge engine
- Schema-driven validation
- True diff view between versions
- Streaming AI responses
- Persistent storage
- Replayable generation timeline

---

## 🧠 What This Project Demonstrates

- Multi-agent orchestration
- Deterministic UI generation
- Incremental AI reasoning
- Safe LLM integration
- Strong system design thinking
- Trustworthy AI architecture
