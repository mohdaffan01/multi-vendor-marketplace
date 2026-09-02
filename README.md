# 🛍️ Multi-Vendor Marketplace - Backend API

A complete, production-ready RESTful API backend for a **Multi-Vendor Marketplace** built with Node.js, Express.js, MongoDB (Mongoose), and JWT authentication.

---

## 📌 Project Features

- 🔐 **JWT Authentication & RBAC**: Token-based authentication using HTTP-only cookies or `Bearer` tokens with Role-Based Access Control (`customer`, `vendor`, `admin`).
- 👥 **User Management**: Customer & Vendor registration, login, profile management, and account administration.
- 🏪 **Vendor/Store Management**: Create, update, and manage vendor store profiles linked to sellers.
- 🏷️ **Category Management**: Organize products under structured categories (Admin managed).
- 📦 **Product Catalog**: Multi-vendor product listings with search, category filtering, stock tracking, and image galleries.
- 🛒 **Shopping Cart**: Real-time cart calculations per user.
- 📜 **Order Processing**: Customer checkout flow, shipping address management, vendor store order tracking, and status updates (`processing`, `shipped`, `delivered`, `cancelled`).
- ⭐ **Reviews & Ratings**: Product rating & review system with auto-computed average ratings.
- ❤️ **Wishlist**: Save favorite products per user.
- 🛡️ **Centralized Error Handling**: Express global error middleware for validation errors, duplicate keys, and invalid ObjectIDs.

---

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Security & Auth**: `jsonwebtoken`, `bcrypt` (password hashing), `cookie-parser`
- **Utilities**: `dotenv`, `cors`

---

## 🚀 API Endpoints Overview

### 1. User & Auth (`/user.router.js`)
- `POST /register` - Register Customer, Vendor, or Admin
- `POST /login` - User login & issue JWT
- `POST /logout` - Logout & clear cookie 🔒
- `GET /me` - Get current user profile 🔒
- `PUT /users/:id` - Update profile 🔒
- `GET /users` - Get all users 🔒 (Admin)
- `DELETE /users/:id` - Delete user 🔒 (Admin)

### 2. Categories (`/category.router.js`)
- `GET /categories` - List categories (Public)
- `GET /categories/:id` - Single category details (Public)
- `POST /categories` - Create category 🔒 (Admin)
- `PUT /categories/:id` - Update category 🔒 (Admin)
- `DELETE /categories/:id` - Delete category 🔒 (Admin)

### 3. Vendor Stores (`/vendor.router.js`)
- `GET /vendors` - List all approved vendor stores (Public)
- `GET /vendors/:id` - Single vendor store profile (Public)
- `POST /vendors` - Create vendor store 🔒 (Vendor/Admin)
- `PUT /vendors/:id` - Update vendor store 🔒 (Vendor/Admin)
- `DELETE /vendors/:id` - Delete store 🔒 (Admin)

### 4. Products (`/product.router.js`)
- `GET /products` - List products with filters (`?category=`, `?vendor=`, `?keyword=`) (Public)
- `GET /products/:id` - Get single product details (Public)
- `POST /products` - Create product 🔒 (Vendor/Admin)
- `PUT /products/:id` - Update product 🔒 (Vendor/Admin)
- `DELETE /products/:id` - Delete product 🔒 (Vendor/Admin)

### 5. Shopping Cart (`/cart.router.js`)
- `GET /cart` - View user cart 🔒
- `POST /cart` - Add item to cart 🔒
- `PUT /cart/item` - Update cart item quantity 🔒
- `DELETE /cart/item/:productId` - Remove item from cart 🔒
- `DELETE /cart` - Clear entire cart 🔒

### 6. Orders (`/order.router.js`)
- `POST /orders` - Place new order (clears cart) 🔒
- `GET /orders/me` - Get customer's orders 🔒
- `GET /orders/vendor/:vendorId` - Get vendor's store orders 🔒 (Vendor/Admin)
- `GET /orders/:id` - Get order detail 🔒
- `GET /orders` - Get all platform orders 🔒 (Admin)
- `PUT /orders/:id/status` - Update order/payment status 🔒 (Vendor/Admin)
- `DELETE /orders/:id` - Delete order 🔒 (Admin)

### 7. Product Reviews (`/review.router.js`)
- `GET /reviews/product/:productId` - Get reviews for product (Public)
- `POST /reviews` - Add review & rating 🔒
- `DELETE /reviews/:id` - Delete review 🔒

### 8. Wishlist (`/wishlist.router.js`)
- `GET /wishlist` - View user wishlist 🔒
- `POST /wishlist` - Add product to wishlist 🔒
- `DELETE /wishlist/item/:productId` - Remove product from wishlist 🔒

---

## ⚡ How to Run

1. **Install Dependencies**:
   ```bash
   cd Backend
   npm install
   ```

2. **Configure Environment (`.env`)**:
   Ensure `.env` inside `Backend/` contains:
   ```env
   PORT=3000
   MONGO_URI=your_mongodb_connection_uri
   JWT_SECRET=your_secret_key
   JWT_EXPIRES_IN=7d
   COOKIE_EXPIRES_TIME=7
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```

---

