# 🧙‍♂️ AI-Powered Wizard Builder

A modern, interactive **Wizard Builder** built with **Next.js 14**, **TypeScript**, **Material UI (MUI)**, and **DnD Kit**, featuring **AI-assisted content generation** for email steps.

This project demonstrates advanced full-stack patterns including drag-and-drop UIs, state management via the Context API, OpenAI API integration, and dynamic step execution.

---

## ✨ Features

### 🧩 Wizard Management
- Create, view, and edit multi-step wizards  
- Each wizard has ordered steps with configurable metadata  

### 🎛️ Drag & Drop Reordering
- Reorder wizard steps easily using **DnD Kit**

### ⚙️ Execution Mode
- Run the wizard step-by-step  
- Visual progress tracking for each executed step  

### 🕒 Persistent History
- Automatically tracks wizard progress, completion status, and timestamps  

### 🤖 AI-Assisted Content Generation
- “Ask AI” button in email steps  
- Generates contextual email content using OpenAI (or mock API)  

---

## 🧰 Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | Next.js 14 (App Router), TypeScript, React 18 |
| **UI Framework** | Material UI (MUI v5) |
| **State Management** | React Context API |
| **Drag & Drop** | DnD Kit |
| **AI Integration** | OpenAI API (`gpt-4o-mini`) |
| **Styling** | MUI SX + Emotion |
| **Routing** | Next.js Dynamic Routes |
| **Mock Data / API** | Next.js Route Handlers |

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/legend-703/wizard-builder.git
cd ai-wizard-builder
2️⃣ Install Dependencies
bash
Copy code
npm install
# or
yarn install
3️⃣ Configure Environment Variables
Create a .env.local file in the project root and add:

bash
Copy code
OPENAI_API_KEY=your_openai_api_key_here
🧠 You can get a free API key from OpenAI Platform.
If no key is provided, the system uses a mock AI response (toggle inside /api/ai/generate-email).

4️⃣ Run the Development Server
bash
Copy code
npm run dev
# or
yarn dev
App runs at 👉 http://localhost:3000

🚀 How to Use
Navigate to /wizards to view available wizards

Click a wizard to open details

Reorder steps via drag-and-drop

Click Execute Wizard to run it step-by-step

For email steps, click “Ask AI” to auto-generate content

Execute steps and complete the wizard

🧭 Assumptions & Design Decisions
AI integration is mocked or powered by OpenAI depending on .env configuration

Simple in-memory or context-based persistence (no database)

Focused on UX flow, interactivity, and realistic integration patterns

🏁 Conclusion
This project demonstrates a complete, modern, and extensible Next.js application combining:

Practical UI/UX design

Realistic AI feature integration

Scalable and maintainable engineering structure

Perfect for showcasing full-stack proficiency in React, TypeScript, and AI integration. 🚀