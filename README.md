# Online Bookstore Management System API

A production-ready RESTful backend system built with Node.js, Express.js, and MongoDB. Features JWT authentication, role-based access control, robust validation, pagination, global error handling, and mock payment integration.

## 🗂️ Folder Structure

```
online-bookstore-backend/
├── config/
│   ├── db.js                 # MongoDB connection logic
│   └── jwt.js                # JWT configuration constants
├── controllers/              # Application logic
│   ├── auth.controller.js
│   ├── book.controller.js
│   ├── cart.controller.js
│   ├── order.controller.js
│   └── payment.controller.js
├── middleware/               # Custom middlewares
│   ├── auth.middleware.js    # JWT & Role checking
│   ├── errorHandler.js       # Global error handling
│   ├── notFound.js           # 404 Route handling
│   └── validate.js           # Joi validation middleware
├── models/                   # Mongoose schemas
│   ├── Book.js
│   ├── Cart.js
│   ├── Order.js
│   └── User.js
├── routes/                   # Express routes
│   ├── auth.routes.js
│   ├── book.routes.js
│   ├── cart.routes.js
│   ├── order.routes.js
│   └── payment.routes.js
├── utils/                    # Shared utilities
│   ├── AppError.js           # Custom Error class
│   ├── apiFeatures.js        # Pagination, Sorting, Filtering logic
│   └── validators.js         # Joi validation schemas
├── .env.example              # Example environment variables
├── .gitignore
├── app.js                    # Express app setup & middleware
├── package.json
└── server.js                 # App entry point
```

## 🚀 Setup & Run Instructions

### Prerequisites
- Node.js (v14+ recommended)
- MongoDB (running locally or a MongoDB Atlas URI)

### 1. Installation
Clone the project and install dependencies:
```bash
npm install
```

### 2. Environment Variables
Create a `.env` file in the root directory and copy the contents from `.env.example`:
```bash
cp .env.example .env
```
Ensure your `MONGO_URI` is correctly pointing to your MongoDB instance.

### 3. Running the Server

**Development Mode (Nodemon):**
```bash
npm run dev
```

**Production Mode:**
```bash
npm start
```

The server should start on `http://localhost:5000`.

---

## 📚 Postman-Ready API Examples

### 1. Authentication

**Register a User**
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user" // Or "admin" for testing admin routes
}
```

**Login**
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```
*Response will contain a `token`. Use this token as a Bearer Token in the Authorization header for protected routes.*

### 2. Books

**Get All Books (Public)**
```http
GET /api/books?page=1&limit=10&category=Fiction
```

**Search Books**
```http
GET /api/books?search=harry
```

**Add a Book (Admin Only)**
```http
POST /api/books
Authorization: Bearer <your_admin_token>
Content-Type: application/json

{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "category": "Fiction",
  "price": 19.99,
  "stock": 50,
  "description": "A classic novel.",
  "publishedYear": 1925
}
```

### 3. Cart

**Add to Cart (Protected)**
```http
POST /api/cart/add
Authorization: Bearer <your_token>
Content-Type: application/json

{
  "bookId": "64d0f5c8e2b8c9a0...", // Replace with a real Book _id
  "quantity": 2
}
```

**Get My Cart (Protected)**
```http
GET /api/cart
Authorization: Bearer <your_token>
```

### 4. Orders

**Create Order (Protected)**
```http
POST /api/orders
Authorization: Bearer <your_token>
Content-Type: application/json

{
  "shippingAddress": {
    "street": "123 Main St",
    "city": "Metropolis",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  }
}
```

**Get My Orders (Protected)**
```http
GET /api/orders/my-orders
Authorization: Bearer <your_token>
```

### 5. Payments

**Process Payment (Protected)**
```http
POST /api/payments/process
Authorization: Bearer <your_token>
Content-Type: application/json

{
  "orderId": "64d0f5c8e2b8c9a1...", // Replace with your created order ID
  "paymentMethod": "credit_card"
}
```
*Note: This is a mock payment integration. It has a 90% success rate to simulate real-world behavior.*
