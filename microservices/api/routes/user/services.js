const express = require('express');
const verify = require('./../../auth/verify');
const axios = require('./../../config/axios');

const router = express.Router();

router.get('/', verify.user, async (req, res, next) => {
    try {
        const { include_deleted } = req.body;
        const services = await axios.db.get('/services', {
            include_deleted
        });
        res.send(services.data);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
