AI-Powered Wizard Builder

A modern, interactive Wizard Builder built with Next.js 14, TypeScript, Material UI (MUI), and DnD Kit, featuring AI-assisted content generation for email steps.

This project demonstrates advanced full-stack patterns including drag-and-drop UI, state management via Context API, OpenAI API integration, and dynamic step execution.

-Features

Wizard Management

Create, view, and edit multi-step wizards

Each wizard has ordered steps with configurable metadata

Drag & Drop Reordering

Reorder steps easily using DnD Kit

Execution Mode

Run the wizard step-by-step

Mark progress with visual feedback

Persistent History

Tracks progress, completion, and timestamps in context or storage

AI-Assisted Content Generation

-Tech Stack
Frontend	Next.js 14 (App Router), TypeScript, React 18
UI Framework	Material UI (MUI v5)
State Management	React Context API
Drag and Drop	DnD Kit
AI Integration	OpenAI API (gpt-4o-mini)
Styling	MUI SX + Emotion
Routing	Next.js Dynamic Routes
Mock Data / API	Next.js Route Handlers

-Setup Instructions

1️.Clone the Repository
git clone https://github.com/legend-703/wizard-builder.git
cd ai-wizard-builder

2️.Install Dependencies
npm install
# or
yarn install

3️.Set Up Environment Variables
Create a .env.local file in the project root and add:

OPENAI_API_KEY=your_openai_api_key_here

You can get a free API key from OpenAI Platform.

If you don’t have an API key, the system can still run with a mock AI response (you can easily toggle this in /api/ai/generate-email).

4️.Run the Development Server
npm run dev
# or
yarn dev

Your app will be available at http://localhost:3000

-How to Use

Go to /wizards to see a list of available wizards.

Click on any wizard to view its steps.

Reorder steps by dragging cards up or down.

Click Execute Wizard to enter step execution mode.

For Email Steps, click “Ask AI” to generate body text automatically.

Mark each step as executed and continue until the wizard completes.

-Conclusion

This project demonstrates a complete, modern, and extensible Next.js app that combines:

Practical UI/UX design

Realistic AI feature integration

Strong engineering structure for scalability

Perfect for evaluating skills in React, TypeScript, and AI integration.