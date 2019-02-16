const express = require('express');
const verify = require('./../../auth/verify');
const axios = require('./../../config/axios');

const router = express.Router();

router.get('/', verify.admin, async (req, res, next) => {
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

router.post('/', verify.admin, async (req, res, next) => {
    try {
        const {
            admin_id,
            service_id,
            duration,
            date_reserved,
            is_finished,
            is_confirmed,
        } = req.body;
        const reservation = await axios.db.post('/reservations', {
            admin_id,
            service_id,
            duration,
            date_reserved,
            is_finished,
            is_confirmed,
        });
        res.send(reservation.data);
    } catch (error) {
        next(error);
    }
});

router.patch('/', verify.admin, async (req, res, next) => {
    try {
        const {
            id,
            admin_id,
            service_id,
            duration,
            date_reserved,
            is_finished,
            is_confirmed,
        } = req.body;
        const reservation = await axios.db.patch(`/reservations/${id}`, {
            admin_id,
            service_id,
            duration,
            date_reserved,
            is_finished,
            is_confirmed,
        });
        res.send(reservation.data);
    } catch (error) {
        next(error);
    }
});

router.delete('/', verify.admin, async (req, res, next) => {
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
