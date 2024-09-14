const businessDetailsService = require('../Service/BusinessDetails.Service');

const updateDetails = async (req, res) => {
    try {
        const update = req.body;
        const email = req.body.email;

        const updatedDetails = await businessDetailsService.updateDetails(email, update);
        if (updatedDetails) {
            res.status(200).json({ message: 'The details have been successfully updated', updatedDetails });
        } else {
            res.status(404).json({ message: 'Details not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating details', error });
    }
};

const getDetails = async (req, res) => {
    try {
        const details = await businessDetailsService.getDetails();
        res.status(200).json(details);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching details', error });
    }
};
module.exports = {
    updateDetails,
    getDetails
};
