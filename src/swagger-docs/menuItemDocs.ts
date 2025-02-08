/**
 * @swagger
 * tags:
 *   name: Menu Items
 *   description: API for managing menu items within restaurants
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     MenuItem:
 *       type: object
 *       properties:
 *         menuItem_id:
 *           type: number
 *           description: The auto-generated ID of the menu item
 *           example: 1
 *         name:
 *           type: string
 *           description: The name of the menu item
 *           example: "Cheeseburger"
 *         price:
 *           type: number
 *           description: The price of the menu item
 *           example: 9.99
 *         description:
 *           type: string
 *           description: Description of the menu item
 *           example: "A delicious cheeseburger with lettuce, tomato, and cheese"
 *         available:
 *           type: boolean
 *           description: Whether the menu item is available
 *           example: true
 */

/**
 * @swagger
 * /restaurants/{id}/menu:
 *   get:
 *     summary: Get all menu items of a restaurant with pagination and keyword filtering
 *     tags: [Menu Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *           example: 123
 *         description: The restaurant ID
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Number of items per page
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *           example: "burger"
 *         description: Keyword to search menu items
 *     responses:
 *       200:
 *         description: Paginated list of menu items
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/MenuItem'
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
 * /restaurants/{id}/menu:
 *   post:
 *     summary: Create one or more menu items for a restaurant
 *     tags: [Menu Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *           example: 123
 *         description: The restaurant ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: "Cheeseburger"
 *                 price:
 *                   type: number
 *                   example: 9.99
 *                 description:
 *                   type: string
 *                   example: "A delicious cheeseburger with lettuce, tomato, and cheese"
 *                 available:
 *                   type: boolean
 *                   example: true
 *     responses:
 *       201:
 *         description: Menu item(s) created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MenuItem'
 *       400:
 *         description: Invalid request payload or error during creation
 */

/**
 * @swagger
 * /restaurants/{id}/menu/{menuItem_id}:
 *   get:
 *     summary: Get details of a specific menu item
 *     tags: [Menu Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *           example: 123
 *         description: The restaurant ID
 *       - in: path
 *         name: menuItem_id
 *         required: true
 *         schema:
 *           type: number
 *           example: 1
 *         description: The menu item ID
 *     responses:
 *       200:
 *         description: Menu item details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MenuItem'
 *       404:
 *         description: Menu item not found
 */

/**
 * @swagger
 * /restaurants/{id}/menu/{menuItem_id}:
 *   put:
 *     summary: Update a specific menu item
 *     tags: [Menu Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *           example: 123
 *         description: The restaurant ID
 *       - in: path
 *         name: menuItem_id
 *         required: true
 *         schema:
 *           type: number
 *           example: 1
 *         description: The menu item ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Cheeseburger"
 *               price:
 *                 type: number
 *                 example: 11.99
 *               description:
 *                 type: string
 *                 example: "Updated description for the cheeseburger"
 *               available:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Menu item updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MenuItem'
 *       404:
 *         description: Menu item not found
 */

/**
 * @swagger
 * /restaurants/{id}/menu/{menuItem_id}:
 *   delete:
 *     summary: Delete a specific menu item
 *     tags: [Menu Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *           example: 123
 *         description: The restaurant ID
 *       - in: path
 *         name: menuItem_id
 *         required: true
 *         schema:
 *           type: number
 *           example: 1
 *         description: The menu item ID
 *     responses:
 *       200:
 *         description: Menu item deleted successfully
 *       404:
 *         description: Menu item not found
 */
