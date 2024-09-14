const express = require('express');
const router = express.Router();
const serviceController = require('../Controllres/service.Controller');

router.get('/get',serviceController.getServices);
router.post('/addService',serviceController.addService);
router.delete('/deleteService/:phone',serviceController.deleteService);
router.put('/updateService/:phone', serviceController.updateService);

module.exports = router;