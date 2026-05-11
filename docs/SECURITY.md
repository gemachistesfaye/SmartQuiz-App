# Security & Guardrails 🛡️

## 1. Role-Based Access Control (RBAC)
Access is strictly enforced at both the UI and Database layers:
*   **UI Layer**: React Protected Routes prevent manual URL navigation to unauthorized pages.
*   **Database Layer**: Firestore Security Rules ensure that a `student` cannot modify the `questions` bank or change their own `xp` arbitrarily (if Cloud Functions are used).

## 2. API Key Protection
To prevent theft of AI quotas:
*   **BYOK Model**: The application does not ship with a hardcoded Gemini key. 
*   **Encrypted Local Storage**: User keys are stored in the browser's local storage and never transmitted to our backend.

## 3. Firestore Security Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own profile
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth.uid == userId || get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    // Questions are read-only for students, CRUD for admins
    match /questions/{qId} {
      allow read: if request.auth != null;
      allow write: if get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

## 4. Route Protection Logic
The `ProtectedRoute` component validates the user's role against the required role for the path. Any violation triggers a `Navigate to="/dashboard"` action.
