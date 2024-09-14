const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Users = require('../models/Users');
const TOKEN_SECRET = 'your_jwt_secret_key';

const login = async (recipientEmail, password) => {
    const email = recipientEmail;
    const user = await Users.findOne({ email });

    if (!user) {
        throw new Error('Invalid email.');
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        throw new Error('Invalid password.');
    }
    const userRole = user.role;
    const token = jwt.sign({ _id: user._id, role: user.role }, TOKEN_SECRET, { expiresIn: '30d' });
    return { token, userRole };
};

const register = async (name, password, email, phone) => {
    const existingUser = await Users.findOne({
        $or: [{ email }, { phone }]
    });
    if (existingUser) {
        throw new Error('User already exists.');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const role = 'user';
    const user = new Users({ name, password: hashedPassword, email, phone, role });
    await user.save();
    return user;
};

module.exports = {
    login,
    register
};