# Simple User Model Specification

**File Path**: [`Backend/models/user.model.js`](file:///c:/Java-Script/projects/multi-vendor-marketplace/Backend/models/user.model.js)

Simplified User model designed for basic user registration and authentication.

---

## 📐 Schema Fields

| Field | Type | Options | Description |
| :--- | :--- | :--- | :--- |
| `name` | `String` | Required, Trim | User's full name |
| `email` | `String` | Required, Trim, Lowercase, Unique | User's email address |
| `password` | `String` | Required, Min 6 characters | Hashed user password |
| `phone` | `String` | Trim | User contact phone number |
| `address` | `String` | Trim | User delivery address |
| `createdAt` | `Date` | Auto (`timestamps: true`) | User registration timestamp |
| `updatedAt` | `Date` | Auto (`timestamps: true`) | Profile update timestamp |
