const usersService = require('../service/users.service');

const getUsers = async (req, res) => {
    try {
        const users = await usersService.getUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving users', error });
    }
};

const getUserByEmail = async (req, res) => {
    try {
        const user = await usersService.getUserByEmail(req.params.email);
        console.log(req.params.email);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving users', error });
    }
};
const deleteUsers = async (req, res) => {
    try {
        const { email } = req.params;
        const result = await usersService.deleteUsers(email);

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'user not found' });
        }

        res.status(200).json({ message: 'The user has been successfully deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
};
const updateUserPassword = async (req, res) => {
    try {
        const userEmail = req.params.recipientEmail;
        const updateUser = await usersService.updateUserPassword(userEmail, req.body.password);
        console.log(updateUser);
        
        if (updateUser) {
            res.status(200).json({ message: 'User updated', updateUser });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating User', error });
    }
};

const updateUserDetails = async (req, res) => {
    try {
        const userEmail = req.params.recipientEmail;
        const updateData = req.body;
        
        const updatedUser = await usersService.updateUserDetails(userEmail, updateData);
        
        if (updatedUser) {
            res.status(200).json({ message: 'User updated', updatedUser });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating User', error });
    }
};
module.exports = {
    getUsers,
    deleteUsers,
    updateUserPassword,
    getUserByEmail,
    updateUserDetails
};