const Orders = require('../models/Orders');

const addOrder = async (orderData) => {
    const newOrder = new Orders(orderData);
    await newOrder.save();
    return newOrder;
};

const updateOrder = async (orderPhone, data) => {
    const updatedOrder = await Orders.findOneAndUpdate(
        { phone: orderPhone },
        data,
        { new: true }
    );
    return updatedOrder;
};

const deleteOrder = async (orderPhone) => {
    const deletedOrder = await Orders.findOneAndDelete({ phone: orderPhone });
    return deletedOrder;
};

const getOrders = async () => {
    const orders = await Orders.find();
    return orders;
};
module.exports = {
    addOrder,
    updateOrder,
    deleteOrder,
    getOrders
};