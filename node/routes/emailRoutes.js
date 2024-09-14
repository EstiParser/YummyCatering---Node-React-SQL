const express = require('express');
const router = express.Router();
const { sendEmailHandler } = require('../Controllres/emailController');

router.post('/send', sendEmailHandler);

module.exports = router;
