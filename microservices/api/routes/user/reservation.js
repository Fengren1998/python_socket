const express = require('express');
const verify = require('./../../auth/verify');
const axios = require('./../../config/axios');

const router = express.Router();

router.get('/', verify.user, async (req, res, next) => {
    try {
        const { include_deleted } = req.body;
        const reservations = await axios.db.get('/reservations', {
            include_deleted
        });
        res.send(reservations.data);
    } catch (error) {
        next(error);
    }
});

router.post('/', verify.user, async (req, res, next) => {
    try {
        const {
            user_id,
            service_id,
            duration,
            date_reserved,
        } = req.body;
        const reservation = await axios.db.post('/reservations', {
            user_id,
            service_id,
            duration,
            date_reserved,
        });
        res.send(reservation.data);
    } catch (error) {
        next(error);
    }
});

router.patch('/', verify.user, async (req, res, next) => {
    try {
        const {
            id,
            user_id,
            service_id,
            duration,
            date_reserved,
        } = req.body;
        const reservation = await axios.db.patch(`/reservations/${id}`, {
            user_id,
            service_id,
            duration,
            date_reserved,
        });
        res.send(reservation.data);
    } catch (error) {
        next(error);
    }
});

router.delete('/', verify.user, async (req, res, next) => {
    try {
        const { ids } = req.body;
        const deleted_reservations = await axios.db.delete('/reservations', {
            data: {
                ids,
            },
        });

        res.send(deleted_reservations.data);
    } catch (error) {
        next(error);
    }
})

module.exports = router;
