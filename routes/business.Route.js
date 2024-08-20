const express = require('express');
const router = express.Router();
const { authenticateToken,authorizeRole } = require('../midlleware/authAdmin&User');
const besinessDetailsController  = require('../Controllres/BusinessDetails.Controller');
router.use(authenticateToken);

/**
 * @swagger
 * /business/updateDetails:
 *   put:
 *     summary: Update business details
 *     tags: [Business]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               businessName:
 *                 type: string
 *               address:
 *                 type: string
 *               email:
 *                 type: string
 *               businessPhone:
 *                 type: string
 *     responses:
 *       200:
 *         description: The details have been successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 updatedDetails:
 *                   type: object
 *       404:
 *         description: Details not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Error updating details
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

/**
 * @swagger
 * /business/getDetails:
 *   get:
 *     summary: Get business details
 *     tags: [Business]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved details
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Error fetching details
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

router.put('/updateDetails',authorizeRole('admin'),besinessDetailsController.updateDetails);
router.get('/getDetails',authorizeRole('user'),besinessDetailsController.getDetails);

module.exports = router;