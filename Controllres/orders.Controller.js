const orderService = require('../Service/orders.service');

const addOrder = async (req, res) => {
    try {
        const newOrder = await orderService.addOrder(req.body);
        res.status(200).json({ message: 'The order has been successfully added', newOrder });
    } catch (error) {
        res.status(500).json({ message: 'Error adding order', error });
    }
};

const updateOrder = async (req, res) => {
    try {
        const orderPhone = req.params.phone;
        const updatedOrder = await orderService.updateOrder(orderPhone, req.body);
        if (updatedOrder) {
            res.status(200).json({ message: 'Order updated', updatedOrder });
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating order', error });
    }
};

const deleteOrder = async (req, res) => {
    try {
        const orderPhone = req.params.phone;
        const deletedOrder = await orderService.deleteOrder(orderPhone);
        if (deletedOrder) {
            res.status(200).json({ message: 'Order deleted successfully' });
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting order', error });
    }
};

const getOrders = async (req, res) => {
    try {
        const orders = await orderService.getOrders();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving orders', error });
    }
};

module.exports = {
    addOrder,
    updateOrder,
    deleteOrder,
    getOrders
};