const serviceService =require('../service/serviceService');

const getServices= async (req, res) => {
    try {
        const services = await serviceService.getServices();
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get services', error });
    }
};

const addService = async (req, res) => {
    try {
        const newService = await serviceService.addService(req.body);
        res.status(200).json({ message: 'The service has been successfully added', newService });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add service', error });
    }
};

const deleteService = async (req, res) => {
    try {
        const ServicePhone = req.params.phone;
        const deletedService = await serviceService.deleteService(ServicePhone);
        if (deletedService) {
            res.status(200).json({ message: 'Service deleted successfully' });
        } else {
            res.status(404).json({ message: 'Service not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete service', error });
    }
};

const updateService = async (req, res) => {
    try {
        const servicePhone = req.params.phone;
        const updatedService = await serviceService.updateService(servicePhone, req.body);
        if (updatedService) {
            res.status(200).json({ message: 'Service updated', updatedOrder });
        } else {
            res.status(404).json({ message: 'Service not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to update order', error });
    }
};

module.exports = {
    getServices,
    addService,
    deleteService,
    updateService
};