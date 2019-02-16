const express = require('express');
const passport = require('./../../auth/passport');

const router = express.Router();

router.get('/', (req, res) => {
    const { user } = req;

    if (!user) {
        res.send({ isLoggedIn: false });
    } else {
        res.send({ isLoggedIn: true, type: 'admin' });
    }
});

router.post('/', passport.authenticate('admin'), (req, res) => {
    const { user } = req;

    if (!user) {
        res.status(403).send('Admin does not exist');
    } else {
        res.send('Login successful.');
    }
});

module.exports = router;
