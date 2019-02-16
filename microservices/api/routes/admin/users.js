const express = require('express');
const verify = require('./../../auth/verify');
const axios = require('./../../config/axios');

const router = express.Router();

router.get('/', verify.admin, async (req, res, next) => {
    try {
        const { include_deleted } = req.body;
        const users = await axios.db.get('/users', {
            include_deleted
        });
        res.send(users.data);
    } catch (error) {
        next(error);
    }
});

router.post('/', verify.admin, async (req, res, next) => {
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
    } catch (error) {
        next(error);
    }
});

router.patch('/', verify.admin, async (req, res, next) => {
    try {
        const {
            id,
            first_name,
            last_name,
            email,
            password,
        } = req.body;
        const user = await axios.db.patch(`/users/${id}`, {
            first_name,
            last_name,
            email,
            password,
        });
        res.send(user.data);
    } catch (error) {
        next(error);
    }
});

router.delete('/', verify.admin, async (req, res, next) => {
    try {
        const { ids } = req.body;
        const deleted_users = await axios.db.delete('/users', {
            data: {
                ids,
            },
        });

        res.send(deleted_users.data);
    } catch (error) {
        next(error);
    }
})

module.exports = router;
