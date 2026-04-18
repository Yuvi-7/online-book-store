/**
 * @swagger
 * components:
 *   schemas:
 *
 *     Register:
 *       type: object
 *       required: [name, email, password]
 *       properties:
 *         name:
 *           type: string
 *           example: Yuvraj
 *         email:
 *           type: string
 *           example: yuvraj@test.com
 *         password:
 *           type: string
 *           example: 123456
 *         role:
 *           type: string
 *           enum: [user, admin]
 *           example: user
 *
 *     Login:
 *       type: object
 *       required: [email, password]
 *       properties:
 *         email:
 *           type: string
 *           example: yuvraj@test.com
 *         password:
 *           type: string
 *           example: 123456
 *
 *     Book:
 *       type: object
 *       required: [title, author, category, price, stock]
 *       properties:
 *         title:
 *           type: string
 *           example: Atomic Habits
 *         author:
 *           type: string
 *           example: James Clear
 *         description:
 *           type: string
 *           example: A book about habits
 *         isbn:
 *           type: string
 *           example: 9780735211292
 *         category:
 *           type: string
 *           enum:
 *             - Fiction
 *             - Non-Fiction
 *             - Science
 *             - Technology
 *             - History
 *             - Biography
 *             - Self-Help
 *             - Children
 *             - Fantasy
 *             - Mystery
 *             - Romance
 *             - Thriller
 *             - Horror
 *             - Poetry
 *             - Other
 *           example: Self-Help
 *         price:
 *           type: number
 *           example: 499
 *         stock:
 *           type: number
 *           example: 10
 *         coverImage:
 *           type: string
 *           example: https://example.com/book.jpg
 *         publisher:
 *           type: string
 *           example: Penguin
 *         publishedYear:
 *           type: number
 *           example: 2020
 *         language:
 *           type: string
 *           example: English
 *         pages:
 *           type: number
 *           example: 250
 *
 *     CartItem:
 *       type: object
 *       required: [bookId]
 *       properties:
 *         bookId:
 *           type: string
 *           example: 64f1a2b3c4d5e6f7a8b9c0d1
 *         quantity:
 *           type: number
 *           example: 2
 *
 *     UpdateCart:
 *       type: object
 *       required: [quantity]
 *       properties:
 *         quantity:
 *           type: number
 *           example: 3
 *
 *     Order:
 *       type: object
 *       required: [shippingAddress]
 *       properties:
 *         shippingAddress:
 *           type: object
 *           properties:
 *             street:
 *               type: string
 *               example: MG Road
 *             city:
 *               type: string
 *               example: Delhi
 *             state:
 *               type: string
 *               example: Delhi
 *             zipCode:
 *               type: string
 *               example: 110001
 *             country:
 *               type: string
 *               example: India
 */