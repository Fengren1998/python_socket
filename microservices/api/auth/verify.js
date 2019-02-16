const axios = require('../config/axios');

const user = (req, res, next) => {
    if (!req.user) {
        res.status(403).send('Unauthorized');
    }
    next();
};

const admin = async (req, res, next) => {
    try {
        const adminAccount = await axios.db.get('/admins/email', {
            params: {
                email: req.user.email,
            },
        });

        if (!adminAccount) {
            throw new Error('Admin user not found.');
        }

        next();
    } catch (error) {
        res.status(403).send('Unauthorized');
    }
};

module.exports = {
    user,
    admin,
};
