const Orders = require('../models/Orders');

const addOrder = async (orderData) => {
    try {
        const newOrder = await Orders.create(orderData);
        return newOrder;
    } catch (error) {
        throw error;
    }
};

const updateOrder = async (orderPhone, data) => {
    const updatedOrder = await Orders.findOneAndUpdate(
        { phone: orderPhone },
        data,
        { new: true }
    );
    return updatedOrder;
};

const deleteOrder = async (orderEmail) => {
    const deletedOrder = await Orders.findOneAndDelete(orderEmail);
    return deletedOrder;
};

const getOrders = async () => {
    const orders = await Orders.find();
    return orders;
};
const getOrderByEmail = async (email) => {
    const orders = await Orders.findOne(email);
    return orders;
};
module.exports = {
    addOrder,
    updateOrder,
    deleteOrder,
    getOrders,
    getOrderByEmail
};