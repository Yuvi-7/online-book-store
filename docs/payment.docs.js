/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: Payment APIs
 */

/**
 * @swagger
 * /api/payments/process:
 *   post:
 *     summary: Process payment
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - orderId
 *               - amount
 *               - paymentMethod
 *             properties:
 *               orderId:
 *                 type: string
 *                 example: 64f1a2b3c4d5e6f7a8b9c0d1
 *               amount:
 *                 type: number
 *                 example: 999
 *               paymentMethod:
 *                 type: string
 *                 example: card
 *     responses:
 *       200:
 *         description: Payment processed successfully
 */