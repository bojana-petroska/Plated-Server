/**
 * @swagger
 * tags:
 *   name: Restaurants
 *   description: API for managing restaurants
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Restaurant:
 *       type: object
 *       properties:
 *         restaurant_id:
 *           type: number
 *           description: The auto-generated id of the restaurant
 *           example: 123
 *         name:
 *           type: string
 *           description: The name of the restaurant
 *           example: "Tasty Treats"
 *         address:
 *           type: string
 *           description: The address of the restaurant
 *           example: "123 Main Street"
 *         phoneNumber:
 *           type: string
 *           description: The phone number of the restaurant
 *           example: "123-456-7890"
 *         email:
 *           type: string
 *           description: The email of the restaurant
 *           example: "info@tastytreats.com"
 *         openingHours:
 *           type: string
 *           description: The operating hours of the restaurant
 *           example: "9:00 AM - 10:00 PM"
 *         deliveryRadius:
 *           type: number
 *           description: The delivery radius of the restaurant in kilometers
 *           example: 5
 *         isOpen:
 *           type: boolean
 *           description: Whether the restaurant is currently open
 *           example: true
 */

/**
 * @swagger
 * /restaurants:
 *   get:
 *     summary: Get all restaurants with pagination
 *     tags: [Restaurants]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: The page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: Paginated list of restaurants
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Restaurant'
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
 * /restaurants/{id}:
 *   get:
 *     summary: Get a restaurant by ID
 *     tags: [Restaurants]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: The restaurant ID
 *     responses:
 *       200:
 *         description: Restaurant details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Restaurant'
 *       404:
 *         description: Restaurant not found
 */

/**
 * @swagger
 * /restaurants/own:
 *   get:
 *     summary: Get the authenticated restaurant's details
 *     tags: [Restaurants]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The authenticated restaurant's details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Restaurant'
 *       400:
 *         description: Restaurant ID missing in request payload
 *       404:
 *         description: Restaurant not found
 */

/**
 * @swagger
 * /restaurants:
 *   post:
 *     summary: Create a new restaurant
 *     tags: [Restaurants]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Tasty Treats"
 *               password:
 *                 type: string
 *                 example: "securepassword"
 *     responses:
 *       201:
 *         description: Restaurant created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Restaurant'
 *       400:
 *         description: Restaurant already exists or invalid request
 */

/**
 * @swagger
 * /restaurants/own:
 *   put:
 *     summary: Update the authenticated restaurant's details
 *     tags: [Restaurants]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Tasty Treats"
 *               address:
 *                 type: string
 *                 example: "456 Updated Street"
 *               phoneNumber:
 *                 type: string
 *                 example: "987-654-3210"
 *     responses:
 *       200:
 *         description: Restaurant updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Restaurant'
 *       404:
 *         description: Restaurant not found
 */

/**
 * @swagger
 * /restaurants/own:
 *   delete:
 *     summary: Delete the authenticated restaurant
 *     tags: [Restaurants]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Restaurant deleted successfully
 *       404:
 *         description: Restaurant not found
 */
