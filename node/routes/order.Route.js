const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const { authenticateToken,authorizeRole } = require('../middleware/authAdmin&User');

const orderContoller  = require('../Controllres/orders.Controller');
router.use(authenticateToken);
/**
 * @swagger
 * /order/addOrder:
 *   post:
 *     summary: Add a new order
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderDate:
 *                 type: string
 *                 format: date
 *               time:
 *                 type: string
 *               serviceType:
 *                 type: string
 *                 enum: [wedding, Bar Mitzvah, engagement, Bat mitzva, alliance]
 *               customerName:
 *                 type: string
 *               phone:
 *                 type: string
 *               notes:
 *                 type: string
 *     responses:
 *       200:
 *         description: The order has been successfully added
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 newOrder:
 *                   type: object
 *                   properties:
 *                     orderDate:
 *                       type: string
 *                       format: date
 *                     time:
 *                       type: string
 *                     serviceType:
 *                       type: string
 *                     customerName:
 *                       type: string
 *                     phone:
 *                       type: string
 *                     notes:
 *                       type: string
 *       500:
 *         description: Error adding order
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
 * /order/updateOrder/{phone}:
 *   put:
 *     summary: Update an order by phone number
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: phone
 *         required: true
 *         schema:
 *           type: string
 *         description: Phone number of the order to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderDate:
 *                 type: string
 *                 format: date
 *               time:
 *                 type: string
 *               serviceType:
 *                 type: string
 *                 enum: [wedding, Bar Mitzvah, engagement, Bat mitzva, alliance]
 *               customerName:
 *                 type: string
 *               phone:
 *                 type: string
 *               notes:
 *                 type: string
 *     responses:
 *       200:
 *         description: Order updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 updatedOrder:
 *                   type: object
 *                   properties:
 *                     orderDate:
 *                       type: string
 *                       format: date
 *                     time:
 *                       type: string
 *                     serviceType:
 *                       type: string
 *                     customerName:
 *                       type: string
 *                     phone:
 *                       type: string
 *                     notes:
 *                       type: string
 *       404:
 *         description: Order not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Error updating order
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
 * /order/deleteOrder/{phone}:
 *   delete:
 *     summary: Delete an order by phone number
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: phone
 *         required: true
 *         schema:
 *           type: string
 *         description: Phone number of the order to delete
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Order not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Error deleting order
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
 * /order/getOrders:
 *   get:
 *     summary: Get all orders
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   orderDate:
 *                     type: string
 *                     format: date
 *                   time:
 *                     type: string
 *                   serviceType:
 *                     type: string
 *                   customerName:
 *                     type: string
 *                   phone:
 *                     type: string
 *                   notes:
 *                     type: string
 *       500:
 *         description: Error retrieving orders
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
router.post('/add',upload.single('file'),authorizeRole('user','admin'),orderContoller.addOrder);
router.put('/update/:phone',authorizeRole('admin'),orderContoller.updateOrder);
router.delete('/delete/:email',authorizeRole('admin'),orderContoller.deleteOrder);
router.get('/get/:email',authorizeRole('admin','user'),orderContoller.getOrders);
router.get('/get',authorizeRole('admin'),orderContoller.getOrders);

module.exports = router;