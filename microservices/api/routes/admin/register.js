const express = require('express');
const bcrypt = require('bcrypt');
const axios = require('./../../config/axios');
const verify = require('./../../auth/verify');

const router = express.Router();

const saltRounds = 10;

router.post('/', /*verify.admin,*/ async (req, res, next) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            isReceptionist,
        } = req.body;

        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);
        const admin = await axios.db.post('http://db-cli:5001/admins', {
            first_name: firstName,
            last_name: lastName,
            email,
            password: hash,
            is_receptionist: isReceptionist,
        });

        res.send(admin.data);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
