const express = require('express');
const axios = require('../config/axios');

const router = express.Router();

/* api health check route */
router.get('/', (req, res) => {
    res.send('pong');
});

router.get('/db-cli', async (req, res, next) => {
    try {
        const result = await axios.db.get('/ping');
        res.send(result.data);
    } catch (error) {
        next(error);
    }
});

router.get('/emailer', async (req, res, next) => {
    try {
        const result = await axios.emailer.get('/ping');
        res.send(result.data);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
