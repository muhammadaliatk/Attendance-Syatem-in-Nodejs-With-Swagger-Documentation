"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const userController_1 = require("../controller/userController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *         - lastLogin
 *         - createdAt
 *         - updatedAt
 *       properties:
 *         id:
 *           type: integer
 *         username:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         lastLogin:
 *           type: DateTime
 *         createdAt:
 *           type: DateTime
 *         updatedAt:
 *           type: DateTime
 *       example:
 *         email: abcxyz
 *         password: abc
 *   securitySchemes:
 *     myAuth:
 *       type: "apiKey"
 *       description: "Value for the Authorization header parameter"
 *       name: "Authorization"
 *       in: "header"
 */
/**
 * @swagger
 * tags:
 *   name: User
 *   description: User API
 */
/**
 * @swagger
 * /user/create:
 *   post:
 *     summary: create new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     security:
 *       - myAuth: []
 *     responses:
 *       200:
 *         description: User created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal Server Error
 */
router.route("/create").post(userController_1.createUser);
/**
 * @swagger
 * paths:
 *   /user/get:
 *     get:
 *       summary: get user
 *       tags: [User]
 *       security:
 *         - myAuth: []
 *       responses:
 *         200:
 *           description: Success.
 *           schema:
 *             $ref: '#/components/schemas/User'
 *         500:
 *           description: Internal Server Error
 */
router.route("/get").get(authMiddleware_1.authenticateToken, userController_1.getUser);
/**
 * @swagger
 * paths:
 *   /user/update/{id}:
 *      put:
 *        summary: Update User by ID
 *        tags: [User]
 *        parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *              type: integer
 *        requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 *        security:
 *          - myAuth: []
 *        responses:
 *          200:
 *            description: The User was updated
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/User'
 *          500:
 *            description: internal server error
 */
router.route("/update/:id").put(authMiddleware_1.authenticateToken, userController_1.updateUser);
/**
 * @swagger
 * paths:
 *   /user/delete/{id}:
 *      delete:
 *        summary: Delete User by ID
 *        tags: [User]
 *        parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *        security:
 *          - myAuth: []
 *        responses:
 *          200:
 *            description: User deleted
 *          500:
 *            description: Internal server error
 */
router.route("/delete/:id").delete(authMiddleware_1.authenticateToken, userController_1.deleteUser);
/**
 * @swagger
 * /user/login:
 *   post:
 *     description: Returns token for authorized User
 *     tags: [User]
 *     content:
 *       - application/json:
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: successful login
 *         schema:
 *           $ref: '#/components/schemas/User'
 *       403:
 *         description: Invalid password
 *       500:
 *         description: Internal Server Error
 */
router.route("/login").post(userController_1.logInUser);
exports.default = router;
