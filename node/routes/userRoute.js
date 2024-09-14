const express = require('express');
const router = express.Router();
const { authenticateToken,authorizeRole } = require('../middleware/authAdmin&User');

const usersController = require('../Controllres/users.Controller');

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
router.get('/get',authenticateToken,authorizeRole('admin'),usersController.getUsers);
router.get('/get/:email',authenticateToken,authorizeRole('admin','user'),usersController.getUserByEmail);
router.delete('/delete/:email',authenticateToken,authorizeRole('admin'),usersController.deleteUsers);
router.put('/update/:recipientEmail',usersController.updateUserPassword);
router.put('/updateDetails/:recipientEmail',authenticateToken,authorizeRole('admin'), usersController.updateUserDetails);

module.exports = router;