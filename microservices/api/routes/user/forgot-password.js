const express = require('express');
const axios = require('./../../config/axios');

const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        const { email } = req.body;

        const hash = await axios.db.post('/forgot-password-hash', { email });
        await axios.emailer.post('/forgot-password', { email, hash: hash.data.hash });

        res.send('OK');
    } catch (error) {
        next(error);
    }
});

// @TODO: UPDATE THIS
router.post('/reset', async (req, res, next) => {
    try {
        const { email, newPassword, hash } = req.body;
        const userHash = await axios.db.get(`/forgot-password-hash?email=${email}`);

        if (userHash.data.hash !== hash) {
            throw new Error('Hash does not equal user hash');
        }

        await axios.db.patch('/users/email', { email, password: newPassword });

        res.send('OK');
    } catch (error) {
        next(error);
    }
});

module.exports = router;
