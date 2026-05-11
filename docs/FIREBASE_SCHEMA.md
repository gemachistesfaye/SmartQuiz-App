# Firebase Schema & Data Model 📊

## Firestore Collections

### 1. `users` (Collection)
Primary storage for user profiles and progress.
*   `uid` (Document ID)
*   `fullName`: String
*   `email`: String
*   `role`: "student" | "admin"
*   `xp`: Number (Total experience points)
*   `streak`: Number (Highest daily streak)
*   `createdAt`: Timestamp

### 2. `questions` (Collection)
The global question bank for the quiz engine.
*   `id` (Document ID)
*   `question`: String (The challenge text)
*   `options`: Array<String> (4 possible answers)
*   `correct`: Number (Index of the right answer, 0-3)
*   `difficulty`: "easy" | "medium" | "hard"
*   `category`: String (e.g., "Architecture", "Syntax")
*   `explanation`: String (Pedagogical feedback)

### 3. `quizAttempts` (Collection - Planned)
Log of every quiz taken for analytics.
*   `userId`: String (Reference to user)
*   `score`: Number
*   `xpGained`: Number
*   `timestamp`: Timestamp

## Data Integrity
*   **XP Counting**: Handled via Firestore `increment()` to avoid race conditions.
*   **Leaderboard**: A query-driven view sorting the `users` collection by `xp` in descending order.
