# Authentication System 🔐

## Overview
SmartQuiz-App uses a hardened Firebase-based authentication flow with a custom middleware layer for role management.

## Authentication Flow
1.  **Identity Verification**: Handled by Firebase Auth.
2.  **Metadata Fetching**: Upon login, the system immediately pulls the user's document from the `users` collection.
3.  **Role Synchronization**: The `AuthContext` determines if the user is a `student` or `admin`.
4.  **Route Protection**: `ProtectedRoute.jsx` ensures users are only allowed in their authorized areas.

## Master Admin Continuity
The system includes a **Persistent Administrative Bypass**:
*   **Target User**: `admin@smartquiz.com`
*   **Logic**: Even if the database record is changed, the frontend code contains a "Self-Healing" mechanism that forces this specific UID into the `admin` role upon session start.

## Security Features
*   **Automatic Role Repair**: The system validates admin status on every login.
*   **Session Persistence**: Users stay logged in across refreshes via Firebase's local persistence.
*   **Protected Nav**: Sidebars and Headers dynamically render only the links appropriate for the user's role.
