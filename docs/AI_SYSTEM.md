# AI Tutoring System 🧠🤖

## Overview
The SmartQuiz AI Tutor is a specialized implementation of the **Google Gemini 1.5 Flash** model, designed to act as a Senior JavaScript Mentor.

## Intelligence Guardrails
The AI is governed by a **Strict System Instruction** (System Prompt) that enforces the following:
1.  **Domain Restriction**: The AI only responds to technical queries about JavaScript, React, CSS, and Web Security.
2.  **Pedagogical Tone**: It is instructed to explain "why" things work, rather than just giving the answer.
3.  **Code-Centric**: It must provide idiomatic, clean code snippets using modern ES6+ standards.

## How it Works
1.  **API Call**: When a student asks a question, the frontend creates a `GoogleGenerativeAI` instance using the user's stored key.
2.  **Prompt Construction**: The user query is wrapped in a "Mentor Wrapper" that adds the system rules.
3.  **Stream Handling**: The response is processed and stored in the chat state.
4.  **Markdown Rendering**: The raw AI output is passed through `react-markdown` to ensure technical accuracy and readability.

## Future Upgrades
*   **Contextual Awareness**: Passing the user's recent quiz performance to the AI so it can suggest specific topics to study.
*   **Code Review Mode**: Allowing users to paste their entire projects for AI-driven architectural advice.
