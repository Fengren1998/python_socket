const axios = require('../config/axios');

const user = (req, res, next) => {
    if (!req.user && !req.user.type === 'user') {
        res.status(403).send('Unauthorized');
    }
    next();
};

const admin = async (req, res, next) => {
    console.log(req.user);
    try {
        const adminAccount = await axios.db.get('/admins/email', {
            params: {
                email: req.user.email,
            },
        });

        if (!adminAccount && !req.user.type === 'admin') {
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
