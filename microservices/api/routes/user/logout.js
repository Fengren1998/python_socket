const express = require('express');
const verify = require('./../../auth/verify');

const router = express.Router();

router.post('/', verify.user, (req, res, next) => {
    try {
        req.logout();
        res.status(200).send('OK');
    } catch (error) {
        next(error);
    }
});

module.exports = router;
