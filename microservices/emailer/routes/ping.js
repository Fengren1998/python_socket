const express = require('express');

const router = express.Router();

/* health check route */
router.get('/', (req, res) => {
    res.send('pong');
});

module.exports = router;
