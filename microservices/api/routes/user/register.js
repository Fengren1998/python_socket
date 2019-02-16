const express = require('express');
const bcrypt = require('bcrypt');
const axios = require('./../../config/axios');

const router = express.Router();

const saltRounds = 10;

router.post('/', async (req, res, next) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
        } = req.body;

        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);
        const user = await axios.db.post('/users', {
            first_name: firstName,
            last_name: lastName,
            email,
            password: hash,
        });

        const emailVerificationHash = await axios.db.post('/verification-hash', { email });
        await axios.emailer.post('/verification', { email, hash: emailVerificationHash.data.hash });

        res.send(user.data);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
