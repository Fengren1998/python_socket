const express = require('express');
const passport = require('./../../auth/passport');

const router = express.Router();

router.get('/', (req, res) => {
    const { user } = req;

    if (!user) {
        res.send({ isLoggedIn: false });
    } else {
        res.send({ isLoggedIn: true, type: 'user' });
    }
});

router.post('/', passport.authenticate('user'), (req, res) => {
    const { user } = req;

    if (!user) {
        res.status(403).send('User does not exist');
    } else {
        res.send('Login successful.');
    }
});

module.exports = router;
