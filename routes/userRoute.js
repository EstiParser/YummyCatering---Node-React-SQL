const express = require('express');
const router = express.Router();
const { authenticateToken,authorizeRole } = require('../midlleware/authAdmin&User');

const usersController = require('../Controllres/users.Controller');
router.use(authenticateToken);

/**
 * @swagger
 * /users/getUsers:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   role:
 *                     type: string
 *       500:
 *         description: Error retrieving users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */
router.get('/getUsers',authorizeRole('admin'),usersController.getUsers);

module.exports = router;