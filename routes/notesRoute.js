const express = require('express');
const router = express.Router();
const { authenticateToken,authorizeRole } = require('../middleware/authAdmin&User');
const notesController = require('../Controllres/notes.Controller');

router.use(authenticateToken);

/**
 * @swagger
 * /notes/getNotes:
 *   get:
 *     summary: Get all notes
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved notes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   userName:
 *                     type: string
 *                   email:
 *                     type: string
 *                   notes:
 *                     type: string
 *       500:
 *         description: Error retrieving notes
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
 * /notes/addNote:
 *   post:
 *     summary: Add a new note
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *               email:
 *                 type: string
 *               notes:
 *                 type: string
 *     responses:
 *       200:
 *         description: The note has been successfully added
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 note:
 *                   type: object
 *                   properties:
 *                     userName:
 *                       type: string
 *                     email:
 *                       type: string
 *                     notes:
 *                       type: string
 *       500:
 *         description: Error adding note
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
router.get('/get',authorizeRole('admin'),notesController.getNotes);
router.post('/add',authorizeRole('user'),notesController.addNote);
router.delete('/delete',authorizeRole('admin'),notesController.deleteNote);

module.exports = router;
