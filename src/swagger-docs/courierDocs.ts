/**
 * @swagger
 * tags:
 *   name: Couriers
 *   description: API for managing couriers
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Courier:
 *       type: object
 *       properties:
 *         courierId:
 *           type: number
 *           description: The auto-generated ID of the courier
 *           example: 1
 *         name:
 *           type: string
 *           description: The name of the courier
 *           example: "John Doe"
 *         email:
 *           type: string
 *           description: The email of the courier
 *           example: "johndoe@example.com"
 *         phoneNumber:
 *           type: string
 *           description: The phone number of the courier
 *           example: "+1234567890"
 *         availability:
 *           type: string
 *           description: The availability status of the courier
 *           example: "available"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the courier was created
 *           example: "2024-01-31T12:00:00Z"
 */

/**
 * @swagger
 * /couriers/{id}:
 *   get:
 *     summary: Get a specific courier by ID
 *     tags: [Couriers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: The ID of the courier
 *     responses:
 *       200:
 *         description: Details of the courier
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Courier'
 *       404:
 *         description: Courier not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /couriers:
 *   post:
 *     summary: Create a new courier
 *     tags: [Couriers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 example: "johndoe@example.com"
 *               password:
 *                 type: string
 *                 example: "securepassword"
 *     responses:
 *       201:
 *         description: Courier created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Courier'
 *       400:
 *         description: Invalid input or courier creation failed
 */

/**
 * @swagger
 * /couriers/{id}:
 *   put:
 *     summary: Update a courier's details
 *     tags: [Couriers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: The ID of the courier to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe Updated"
 *               email:
 *                 type: string
 *                 example: "updatedemail@example.com"
 *     responses:
 *       200:
 *         description: Courier updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Courier'
 *       404:
 *         description: Courier not found
 *       500:
 *         description: Internal server error
 */
