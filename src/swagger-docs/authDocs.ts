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
 *     UserAuthRequestSignUp:
 *       type: object
 *       properties:
 *         userName:
 *           type: string
 *           description: The username of the user
 *           example: "compact_bo"
 *         email:
 *           type: string
 *           description: The email of the user
 *           example: "compact_bo@gmail.com"
 *         password:
 *           type: string
 *           description: The password for the account
 *           example: "strongpassword10%"
 *     UserAuthRequestSignIn:
 *       type: object
 *       properties:
 *         userName:
 *           type: string
 *           description: The username of the user
 *           example: "compact_bo"
 *         email:
 *           type: string
 *           description: The email of the user
 *           example: "compact_bo@gmail.com"
 *         password:
 *           type: string
 *           description: The password for the account
 *           example: "strongpassword10%"
 *     UserAuthResponse:
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
 *               example: "compact_bo"
 *             token:
 *               type: string
 *               description: The JWT access token
 *               example: "eyJhbGciOiJIUzI1..."
 *             refreshToken:
 *               type: string
 *               description: The JWT refresh token
 *               example: "eyJhbGciOiJIUzI1..."
 *     RestaurantAuthRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the restaurant
 *           example: "Mama Italiane"
 *         password:
 *           type: string
 *           description: The password for the restaurant account
 *           example: "strongpassword10%"
 *     RestaurantAuthResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Indicates success of the operation
 *           example: true
 *         message:
 *           type: string
 *           description: A message describing the result
 *           example: "Restaurant signed in successfully."
 *         data:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               example: "Mama Italiane"
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
 * /auth/signup:
 *   post:
 *     summary: Sign up a new user
 *     tags: [User Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserAuthRequestSignUp'
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
 * /auth/signin:
 *   post:
 *     summary: Sign in an existing user
 *     tags: [User Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserAuthRequestSignIn'
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
 * /auth/refreshtoken:
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
 * /auth/restaurant/signup:
 *   post:
 *     summary: Sign up a new restaurant
 *     tags: [Restaurant Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RestaurantAuthRequest'
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
 * /auth/restaurant/signin:
 *   post:
 *     summary: Sign in an existing restaurant
 *     tags: [Restaurant Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RestaurantAuthRequest'
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
 * /auth/restaurant/refreshtoken:
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
