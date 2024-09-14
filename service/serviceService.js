
const Service = require('../models/Service');

const getServices = async () => {
    const servicec = await Service.find();
    return servicec;
};

const addService = async (serviceData) => {
    const newService = new Service(serviceData);
    await newService.save();
    return newService;
};

const deleteService = async (phone) => {
    const deletedService = await Service.findOneAndDelete({ phone });
    return deletedService;
};

const updateService = async (phone, data) => {
    const updatedService = await Service.findOneAndUpdate(
        { phone },
        data,
        { new: true }
    );
    return updatedService;
};

module.exports = {
    getServices,
    addService,
    deleteService,
    updateService
};
