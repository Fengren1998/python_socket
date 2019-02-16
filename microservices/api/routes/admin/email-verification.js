const express = require('express');
const verify = require('./../../auth/verify');
const axios = require('./../../config/axios');

const router = express.Router();

router.post('/', verify.admin, async (req, res, next) => {
    try {
        const { email } = req.body;

        await axios.db.patch('/users/email', { email, is_verified: true });

        res.send('OK');
    } catch (error) {
        next(error);
    }
});

module.exports = router;
