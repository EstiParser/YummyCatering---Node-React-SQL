const usersService = require('../Service/users.service');

const getUsers = async (req, res) => {
    try {
        const users = await usersService.getUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving users', error });
    }
};

module.exports = {
    getUsers
};