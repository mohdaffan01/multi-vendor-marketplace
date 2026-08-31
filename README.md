# Multi-Vendor Marketplace - Project Documentation

## 📌 Project Overview
This repository contains the full-stack architecture for a **Multi-Vendor Marketplace**. It enables multiple vendors (sellers) to register, manage their stores, list products, and fulfill orders, while customers can browse, purchase items, and manage their profiles.

---

## 📁 Repository Structure

```text
multi-vendor-marketplace/
├── Backend/
│   ├── config/             # Database and app configurations (planned)
│   ├── controllers/        # Route controllers (user.controller.js initialized)
│   ├── models/             # Mongoose schemas & models
│   │   └── user.model.js   # User model (Customer, Vendor, Admin)
│   ├── routes/             # API routes (planned)
│   ├── middlewares/        # Auth & error handling middlewares (planned)
│   ├── .env                # Environment variables configuration
│   ├── .env.example        # Environment variable template
│   ├── package.json        # Node.js ES Module configuration & dependencies
│   └── server.js           # Main Express server entry point
├── Frontend/               # Client application (planned)
└── Docs/                   # Project documentation & schema guides
```

---

## 🛠️ Technology Stack (Backend)

- **Runtime**: Node.js (ES Modules - `"type": "module"`)
- **Framework**: Express.js (`v5.2.1`)
- **Database**: MongoDB with Mongoose ODM (`v8.x`)
- **Utility Libraries**: `cors`, `dotenv`

---

## ✅ Progress & Implementation Completed

### 1. Express Server Initialization (`server.js`)
- Configured Express 5 server listening on configurable `PORT` (Default: `5000`).
- Enabled standard security & parsing middlewares (`cors`, `express.json()`, `express.urlencoded()`).
- Added health-check endpoints (`/` and `/api/health`).
- Implemented global 404 route handler and centralized Error Handling Middleware.

### 2. User Data Model (`models/user.model.js`)
Implemented a robust Mongoose schema supporting 3 distinct roles: **Customer**, **Vendor**, and **Admin**.

#### Key Features of `User` Model:
- **Core User Profile**:
  - `name`: Full name string (max 50 chars).
  - `email`: Trimmed, lowercased, unique, validated with regular expression.
  - `password`: Hashed password string (`select: false` by default for query protection).
  - `role`: Enum `['customer', 'vendor', 'admin']` (default: `'customer'`).
  - `phone`, `avatar`: Optional contact & profile image paths.
- **Embedded Address Schema (`addresses`)**:
  - Array of user delivery addresses (`street`, `city`, `state`, `zipCode`, `country`, `isDefault`).
- **Vendor-Specific Profile (`vendorDetails`)**:
  - `storeName`: Unique store identifier.
  - `storeDescription`, `storeLogo`, `storeBanner`.
  - `taxId`: Business / Tax Identification.
  - `isApproved`: Boolean flag for platform administrator approval.
  - `commissionRate`: Platform percentage cut (default: `10%`).
  - `bankAccount`: Account details for vendor payouts (`accountHolder`, `accountNumber`, `bankName`, `routingNumber`).
- **Security & Status Fields**:
  - `isEmailVerified`, `isActive`.
  - `resetPasswordToken`, `resetPasswordExpire`.
  - `verificationToken`, `verificationTokenExpire`.
- **Serialization Protection**:
  - Built-in `toJSON()` method strips sensitive properties (`password`, `resetPasswordToken`, `verificationToken`) automatically whenever user objects are sent in API responses.

---

## 🚀 Next Planned Steps

1. **Database Connection (`Backend/config/db.js`)**:
   - Establish Mongoose connection to MongoDB URI using `.env`.
2. **User Controller & Authentication Routes (`controllers/user.controller.js`)**:
   - Register user (Customer / Vendor registration workflows).
   - User login & JWT authentication token generation.
   - Password reset workflow & profile management.
3. **Middleware**:
   - JWT validation middleware & Role-based Access Control (`protect`, `authorize('admin', 'vendor')`).
