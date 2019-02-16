const express = require('express');
const verify = require('./../../auth/verify');

const router = express.Router();

router.post('/', verify.admin, (req, res) => {
    req.logout();
    res.status(200).send('OK');
});

module.exports = router;
