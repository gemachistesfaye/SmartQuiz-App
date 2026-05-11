# Technical Documentation: SmartQuiz-App Architecture 🛡️📊

This document provides a deep dive into the technical implementation and architectural decisions of the SmartQuiz Platform.

---

## 1. Authentication & Role-Based Access Control (RBAC)

### Implementation
The platform uses **Firebase Authentication** combined with a custom **AuthContext**. Roles are stored in a `users` collection in Firestore.

### Security Gatekeeping
*   **ProtectedRoute.jsx**: Intercepts routing requests. If a user attempts to access an `/admin` route without the `admin` role, they are forcefully redirected to the Student dashboard.
*   **Master Admin Logic**: The system includes a hardcoded check for the master email. On login, the app automatically verifies and "repairs" the Firestore record to ensure the master user always has admin privileges.

---

## 2. Real-Time Data Architecture

### Firestore Collections
1.  **Users**: Stores `fullName`, `email`, `role`, `xp`, and `streak`.
2.  **Questions**: Stores the question bank used by the Quiz Engine.
    *   Fields: `question`, `options[]`, `correct` (index), `difficulty`, `explanation`.
3.  **Stats (Platform)**: Aggregated data for the SuperAdmin view.

### State Synchronization
The app uses **React Hooks** (useEffect/onSnapshot) to maintain a live link between the UI and Firestore. XP gains in the Quiz are reflected on the Dashboard instantly without page reloads.

---

## 3. AI Assistant (Gemini Integration)

### AI Logic
The `AIAssistant.jsx` component implements a specialized "Pro Tutor" via the `@google/generative-ai` SDK.

*   **Security**: Uses a BYOK (Bring Your Own Key) model. Keys are stored in `localStorage` and never hardcoded, preventing quota theft and API exposure.
*   **Prompt Engineering**: A hidden System Instruction strictly enforces a JavaScript-only focus, preventing the AI from discussing irrelevant topics.
*   **Rendering**: Uses `react-markdown` to provide high-fidelity technical documentation within the chat window.

---

## 4. Quiz Engine Mechanics

### useQuiz Hook
The core logic resides in a custom hook that handles:
*   **Fetching**: Pulling and shuffling questions from Firestore.
*   **Scoring**: Calculating XP based on correct answers and current streak bonuses.
*   **Persistence**: Automatically updating the User document in Firestore upon quiz completion.
*   **Timer**: A background interval for competitive "Timer Mode" testing.

---

## 5. Design System

### Visual Language
*   **CSS Architecture**: Vanilla CSS combined with Tailwind utilities for layout.
*   **Glassmorphism**: Extensive use of `backdrop-filter: blur()` and semi-transparent borders.
*   **Animations**: Framer Motion is used for layout transitions, modal fades, and entry animations.

---

## 6. Admin Control Center

### Capabilities
*   **Real-time Monitoring**: Direct table view of the `users` collection.
*   **Content Management**: A dedicated interface for managing the question bank (CRUD operations).
*   **Platform Overview**: High-level counters for total users and database health.

---

## 7. Deployment & Maintenance

### Security Rules (Production)
The Firestore Security Rules are configured to allow:
*   Users to read/write only their own data.
*   Admins to read/write the entire database.
*   Public to read the Leaderboard stats only.

### Environment Setup
Standard `.env` configuration is required for `VITE_FIREBASE_API_KEY`, etc., to keep secrets out of version control.
