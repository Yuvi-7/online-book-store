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

## 📚 API Documentation (Swagger)

The project includes comprehensive OpenAPI (Swagger) documentation. 

Once the server is running, you can access the interactive Swagger UI at:
```
http://localhost:5001/api-docs
```

The Swagger interface allows you to:
- Explore all available endpoints and their request/response schemas.
- View required parameters and validation rules.
- Test the API directly from your browser (includes Bearer Token authentication).
