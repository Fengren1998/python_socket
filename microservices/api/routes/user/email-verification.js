const express = require('express');
const axios = require('./../../config/axios');

const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        const { email } = req.body;

        const hash = await axios.db.post('/verification-hash', { email });
        await axios.emailer.post('/verification', { email, hash: hash.data.hash });

        res.send('OK');
    } catch (error) {
        next(error);
    }
});


router.post('/verify', async (req, res, next) => {
    try {
        const { email, hash } = req.body;
        const userHash = await axios.db.get(`/verification-hash?email=${email}`);

        if (userHash.data.hash !== hash) {
            throw new Error('Hash does not equal user hash');
        }

        await axios.db.patch('/users/email', { email, is_verified: true });
        await axios.emailer.post('/verification/success', { email });

        res.send('OK');
    } catch (error) {
        next(error);
    }
});

module.exports = router;
