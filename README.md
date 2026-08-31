# Multi-Vendor Marketplace - Project Documentation

## 📌 Project Overview
This repository contains the backend architecture for a **Multi-Vendor Marketplace**. It enables multiple vendors (sellers) to register, list products, and manage inventory, while customers can register, login, and browse items.

---

## 📁 Repository Structure

```text
multi-vendor-marketplace/
├── Backend/
│   ├── controllers/            # Controller logic for users and products
│   │   ├── user.controller.js  # User registration & login
│   │   └── product.controller.js # Product CRUD operations
│   ├── middleware/             # Custom middlewares
│   │   ├── error.middleware.js # Centralized global error handling
│   │   └── auth.middleware.js  # JWT Protect & Role-based Authorization
│   ├── models/                 # Mongoose database models
│   │   ├── user.model.js       # User schema (Customer, Vendor, Admin)
│   │   └── product.model.js    # Product schema
│   ├── routers/                # API route declarations
│   │   ├── user.router.js      # User auth routes (/register, /login)
│   │   └── product.router.js   # Product routes (/products)
│   ├── .env                    # Environment variables configuration
│   ├── .env.example            # Environment variable template
│   ├── package.json            # Dependencies & ES Module config
│   └── server.js               # Express application entry point
├── Frontend/                   # Client web application (planned)
├── Docs/                       # Documentation & AI rules
├── Implementation.md           # Backend implementation status tracking
└── postmanTesting.md           # API testing guide with input JSON payloads
```

---

## 🛠️ Technology Stack (Backend)

- **Runtime**: Node.js (ES Modules - `"type": "module"`)
- **Framework**: Express.js (`v5.2.1`)
- **Database**: MongoDB with Mongoose ODM (`v9.9.4`)
- **Authentication & Security**: `bcrypt` (password hashing), `jsonwebtoken`, `cookie-parser`
- **Utility & Middleware**: `cors`, `dotenv`

---

## 🚀 Implemented API Endpoints

### 1. Base & Health Check
- `GET /` - Base API status check
- `GET /health` - Health check status (`{ "status": "ok" }`)

### 2. User Routes (`/routers/user.router.js`)
- `POST /register` - Register a new User (`customer` or `vendor`)
- `POST /login` - User authentication & login
- `GET /profile` - Get authenticated user profile (*Protected*)

### 3. Product Routes (`/routers/product.router.js`)
- `POST /products` - Create a new Product
- `GET /products` - Get all Products (with populated vendor details)
- `GET /products/:id` - Get a single Product by ID
- `PUT /products/:id` - Update Product details by ID
- `DELETE /products/:id` - Remove a Product by ID

---

## ⚙️ Middleware Features

1. **Global Error Handler (`error.middleware.js`)**:
   - Centralized error response formatting for Express.
   - Built-in formatting for Mongoose `CastError`, Duplicate Key (`11000`), and `ValidationError`.

2. **Authentication & Authorization (`auth.middleware.js`)**:
   - `protect`: Verifies JWT from `Authorization: Bearer <token>` header or cookies.
   - `authorize(...roles)`: Restricts route access based on user role (`customer`, `vendor`, `admin`).

---

## 🧪 Postman API Testing
For detailed Postman setup, input JSON payloads, and testing instructions, view [`postmanTesting.md`](file:///c:/Java-Script/projects/multi-vendor-marketplace/postmanTesting.md).
