# MERN Practical – Backend (Node.js + Express + MongoDB)

This backend includes authentication (JWT + cookies), product CRUD with image upload, category APIs, and shopping cart functionality.

==================================================
SETUP & RUN INSTRUCTIONS
==================================================

1. Clone repository:
git clone <your-backend-repo-url>
cd backend

2. Install dependencies:
npm install

3. Create .env file in backend root:

PORT=5000
MONGO_URL=mongodb://localhost:27017/mern_practical
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
COOKIE_EXPIRE=7
FRONTEND_URL=http://localhost:5173

4. Create uploads folder:
backend/uploads/

5. Start backend:
npm start

Backend runs at:
http://localhost:5000

==================================================
ENVIRONMENT VARIABLES USED
==================================================

PORT               → backend server port
MONGO_URL          → your MongoDB local connection string
JWT_SECRET         → JWT signing secret
JWT_EXPIRE         → token expiration (e.g., 7d)
COOKIE_EXPIRE      → cookie expiration in days


==================================================
SEEDER INSTRUCTIONS (OPTIONAL)
==================================================

Seeder file:
backend/seed/categorySeeder.js

Run:
npm run seed:categories

(This deletes old categories and adds new seed categories.)
==================================================
FOLDER STRUCTURE (BACKEND)
==================================================

backend/
│── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── cartController.js
│   │   └── categoryController.js
│   ├── middlewares/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Category.js
│   │   └── Cart.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   ├── cartRoutes.js
│   │   └── categoryRoutes.js
│   └── app.js
│── uploads/
│── seed/
│   └── categorySeeder.js
│── server.js
│── package.json
│── README.md
│── .env

==================================================
API ENDPOINT OVERVIEW
==================================================

-----------------------
AUTH ROUTES
-----------------------
POST /api/auth/register     → Register user
POST /api/auth/login        → Login user (JWT cookie)

-----------------------
PRODUCT ROUTES
-----------------------
GET    /api/products        → Get all products
POST   /api/products        → Create product (multer image upload)
GET    /api/products/:id    → Get single product
PUT    /api/products/:id    → Update product
DELETE /api/products/:id    → Delete product

(Images stored in /uploads and served automatically)

-----------------------
CATEGORY ROUTES
-----------------------
GET /api/categories         → Fetch all categories

-----------------------
CART ROUTES (PROTECTED)
-----------------------
GET    /api/cart                        → Get user cart
POST   /api/cart/add                    → Add product to cart
PUT    /api/cart/update/:productId      → Update quantity
DELETE /api/cart/remove/:productId      → Remove product from cart


