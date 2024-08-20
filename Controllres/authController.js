const authService = require('../Service/auth.Service');

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const {token , userRole} = await authService.login(email, password);
        res.header("auth-token", token).send({ token, userRole });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const register = async (req, res) => {
    const { name, password, email, role } = req.body;
    try {
        const user = await authService.register(name, password, email, role);
        res.status(200).json({ message: 'The user has been successfully added', user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    login,
    register
};
