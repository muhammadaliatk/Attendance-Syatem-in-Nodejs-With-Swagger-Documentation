"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const attendanceController_1 = require("../controller/attendanceController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Attendance:
 *       type: object
 *       required:
 *         - date
 *         - presentStatus
 *         - userId
 *       properties:
 *         id:
 *           type: integer
 *         date:
 *           type: DateTime
 *         presentStatus:
 *           type: Boolean
 *         userId:
 *           type: integer
 *       example:
 *         presentStatus: true
 *         userId: 1
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
 *   name: Attendance
 *   description: User API
 */
/**
 * @swagger
 * /attendance/addAttendance:
 *   post:
 *     summary: Add Attendance
 *     tags: [Attendance]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Attendance'
 *     responses:
 *       200:
 *         description: Add Attendance
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Attendance'
 *       500:
 *         description: Internal Server Error
 */
router.route("/addAttendance").post(attendanceController_1.addAttendance);
/**
 * @swagger
 * paths:
 *   /attendance/get/{id}:
 *     get:
 *       summary: Get Attendance by ID
 *       tags: [Attendance]
 *       parameters:
 *         - name: id
 *           in: path
 *           description: Get Attendance
 *           required: true
 *           schema:
 *             type: integer
 *       responses:
 *         200:
 *           description: Success.
 *           schema:
 *             $ref: '#/components/schemas/Attendance'
 *         500:
 *           description: Internal Server Error
 */
router.route("/get/:id").get(attendanceController_1.getUserAttendance);
/**
 * @swagger
 * paths:
 *   /attendance/summary:
 *     get:
 *       summary: Attendance Summary
 *       tags: [Attendance]
 *       responses:
 *         200:
 *           description: Success.
 *           schema:
 *             $ref: '#/components/schemas/Attendance'
 *         500:
 *           description: Internal Server Error
 */
router.route("/summary").get(attendanceController_1.summary);
/**
 * @swagger
 * paths:
 *   /attendance/update/{id}:
 *      put:
 *        summary: Update Attendance by ID
 *        tags: [Attendance]
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
 *                $ref: '#/components/schemas/Attendance'
 *        security:
 *          - myAuth: []
 *        responses:
 *          200:
 *            description: Attendance update
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Attendance'
 *          500:
 *            description: internal server error
 */
router.route("/update/:id").put(authMiddleware_1.authenticateToken, attendanceController_1.updateAttendance);
exports.default = router;
