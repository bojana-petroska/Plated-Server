/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: API for managing user orders
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         orderId:
 *           type: number
 *           description: The auto-generated ID of the order
 *           example: 1
 *         userId:
 *           type: number
 *           description: The ID of the user who placed the order
 *           example: 101
 *         restaurantId:
 *           type: number
 *           description: The ID of the restaurant for the order
 *           example: 202
 *         items:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               itemId:
 *                 type: number
 *                 description: The ID of the menu item
 *                 example: 303
 *               quantity:
 *                 type: number
 *                 description: The quantity of the item ordered
 *                 example: 2
 *         total:
 *           type: number
 *           description: The total price of the order
 *           example: 25.50
 *         status:
 *           type: string
 *           description: The current status of the order
 *           example: "pending"
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders for the authenticated user
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: The page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: The number of orders per page
 *     responses:
 *       200:
 *         description: A paginated list of orders
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Order'
 *                 totalItems:
 *                   type: integer
 *                   example: 50
 *                 currentPage:
 *                   type: integer
 *                   example: 1
 *                 totalPages:
 *                   type: integer
 *                   example: 5
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /orders/{orderId}:
 *   get:
 *     summary: Get a specific order by ID for the authenticated user
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: number
 *         description: The ID of the order
 *     responses:
 *       200:
 *         description: Details of the order
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Invalid user ID or order ID
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new order for the authenticated user
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               restaurantId:
 *                 type: number
 *                 example: 202
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     itemId:
 *                       type: number
 *                       example: 303
 *                     quantity:
 *                       type: number
 *                       example: 2
 *     responses:
 *       201:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Order creation failed or invalid input
 *       401:
 *         description: User not authenticated
 */

/**
 * @swagger
 * /orders/{orderId}/{orderItemId}:
 *   put:
 *     summary: Update an item in a user's order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: number
 *         description: The ID of the order
 *       - in: path
 *         name: orderItemId
 *         required: true
 *         schema:
 *           type: number
 *         description: The ID of the item in the order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               operation:
 *                 type: string
 *                 description: "Increase or decrease the quantity of the item"
 *                 example: "increase"
 *     responses:
 *       200:
 *         description: Order item updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Invalid input or operation
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /orders/{orderId}:
 *   delete:
 *     summary: Cancel an order for the authenticated user
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: number
 *         description: The ID of the order
 *     responses:
 *       200:
 *         description: Order canceled successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Invalid user ID or order ID
 *       500:
 *         description: Internal server error
 */
