const Users = require('../models/Users');
const bcrypt = require('bcrypt');

const getUsers = async () => {
    const users = await Users.find();
    return users;
};

const getUserByEmail = async (email) => {
    const users = await Users.findOne({ email: email });
    console.log(users);
    
    return users;
};
const deleteUsers = async (email) => {
    const users = await Users.deleteOne({ email: email });
    return users;
};
const updateUserPassword = async (recipientEmail, newPassword) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        const passwordUpdate = { password: hashedPassword };
        const update = await Users.findOneAndUpdate(
            { email: recipientEmail },
            passwordUpdate,
            { new: true }
        );
        return update;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};

const updateUserDetails = async (recipientEmail, updateData) => {
    try {
        const update = await Users.findOneAndUpdate(
            { email: recipientEmail },
            updateData,
            { new: true }
        );
        return update;
    } catch (error) {
        console.error('Error updating user details:', error);
        throw error;
    }
};
module.exports = {
    getUsers,
    deleteUsers,
    updateUserPassword,
    getUserByEmail,
    updateUserDetails
};