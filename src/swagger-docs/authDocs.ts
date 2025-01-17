/**
 * @swagger
 * tags:
 *   - name: User Authentication
 *     description: API for user authentication (signup, signin, and refresh tokens)
 *   - name: Restaurant Authentication
 *     description: API for restaurant authentication (signup, signin, and refresh tokens)
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AuthRequest:
 *       type: object
 *       properties:
 *         userName:
 *           type: string
 *           description: The username of the user
 *           example: "john_doe"
 *         email:
 *           type: string
 *           description: The email of the user
 *           example: "john@example.com"
 *         password:
 *           type: string
 *           description: The password for the account
 *           example: "securepassword123"
 *     AuthResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Indicates success of the operation
 *           example: true
 *         message:
 *           type: string
 *           description: A message describing the result
 *           example: "User signed in successfully."
 *         data:
 *           type: object
 *           properties:
 *             userName:
 *               type: string
 *               example: "john_doe"
 *             token:
 *               type: string
 *               description: The JWT access token
 *               example: "eyJhbGciOiJIUzI1..."
 *             refreshToken:
 *               type: string
 *               description: The JWT refresh token
 *               example: "eyJhbGciOiJIUzI1..."
 */

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Sign up a new user
 *     tags: [User Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthRequest'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         description: Invalid input or user already exists
 */

/**
 * @swagger
 * /signin:
 *   post:
 *     summary: Sign in an existing user
 *     tags: [User Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthRequest'
 *     responses:
 *       200:
 *         description: User signed in successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       401:
 *         description: Invalid credentials
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /refreshtoken:
 *   post:
 *     summary: Generate a new access token using a refresh token
 *     tags: [User Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 description: The refresh token for reauthentication
 *                 example: "eyJhbGciOiJIUzI1..."
 *     responses:
 *       200:
 *         description: New access token generated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: The new JWT access token
 *                   example: "eyJhbGciOiJIUzI1..."
 *       401:
 *         description: Refresh token required
 *       403:
 *         description: Invalid refresh token
 */

/**
 * @swagger
 * /restaurant/signup:
 *   post:
 *     summary: Sign up a new restaurant
 *     tags: [Restaurant Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthRequest'
 *     responses:
 *       201:
 *         description: Restaurant created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         description: Invalid input or restaurant already exists
 */

/**
 * @swagger
 * /restaurant/signin:
 *   post:
 *     summary: Sign in an existing restaurant
 *     tags: [Restaurant Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthRequest'
 *     responses:
 *       200:
 *         description: Restaurant signed in successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       401:
 *         description: Invalid credentials
 *       404:
 *         description: Restaurant not found
 */

/**
 * @swagger
 * /restaurant/refreshtoken:
 *   post:
 *     summary: Generate a new access token for a restaurant using a refresh token
 *     tags: [Restaurant Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 description: The refresh token for reauthentication
 *                 example: "eyJhbGciOiJIUzI1..."
 *     responses:
 *       200:
 *         description: New access token generated for restaurant
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: The new JWT access token
 *                   example: "eyJhbGciOiJIUzI1..."
 *       401:
 *         description: Refresh token required
 *       403:
 *         description: Invalid refresh token
 */
