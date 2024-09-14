const Business = require('../models/BusinessDetails');

const updateDetails = async (email, update) => {
    const updatedDetails = await Business.findOneAndUpdate({ email: email }, update, { new: true, runValidators: true });
    return updatedDetails;
};

const getDetails = async () => {
    const details = await Business.find();
    return details;
};
module.exports = {
    updateDetails,
    getDetails
};
