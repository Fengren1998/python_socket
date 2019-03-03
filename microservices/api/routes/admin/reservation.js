const express = require('express');
const moment = require('moment-timezone');
const verify = require('./../../auth/verify');
const axios = require('./../../config/axios');

const router = express.Router();

router.get('/', verify.admin, async (req, res, next) => {
    try {
        const { include_deleted } = req.body;
        const reservations = await axios.db.get('/reservations', {
            params: {
                include_deleted,
            }
        });
        res.send(reservations.data);
    } catch (error) {
        next(error);
    }
});

router.post('/', verify.admin, async (req, res, next) => {
    try {
        const {
            user_id,
            service_id,
            duration,
            date_reserved,
            is_finished,
            is_confirmed,
        } = req.body;

        let ongoingReservations = await axios.db.get('/reservations', {
            params: {
                include_deleted: false,
                is_confirmed: true,
            },
        });

        ongoingReservations = ongoingReservations.data ? ongoingReservations.data : [];
        ongoingReservations.map(r => {
            if (
                (
                    moment(date_reserved) >= moment(r.date_reserved)
                    && (
                        moment(date_reserved) <=
                        moment(r.date_reserved).add(r.duration, 'hours')
                    ) ||
                    moment(date_reserved).add(duration, 'hours') >= moment(r.date_reserved)
                    && (
                        moment(date_reserved).add(duration, 'hours') <=
                        moment(r.date_reserved).add(r.duration, 'hours')
                    )
                )
                && r.service_id == service_id
            ) {
                throw new Error('Chosen time is unavailable');
            }
        });

        const reservation = await axios.db.post('/reservations', {
            user_id,
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
            user_id,
            service_id,
            duration,
            date_reserved,
            is_finished,
            is_confirmed,
        } = req.body;
        const reservation = await axios.db.patch(`/reservations/${id}`, {
            user_id,
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

router.patch('/:id/approve', verify.admin, async (req, res, next) => {
    try {
        const id = req.params.id;
        const targetReservation = (await axios.db.get(`/reservations/${id}`)).data;

        let ongoingReservations = await axios.db.get('/reservations', {
            params: {
                include_deleted: false,
                is_confirmed: true,
            },
        });

        ongoingReservations = ongoingReservations.data ? ongoingReservations.data : [];
        ongoingReservations.map(r => {
            if (
                (
                    moment(targetReservation.date_reserved) >= moment(r.date_reserved)
                    && (
                        moment(targetReservation.date_reserved) <=
                        moment(r.date_reserved).add(r.duration, 'hours')
                    ) ||
                    moment(targetReservation.date_reserved).add(
                        targetReservation.duration, 'hours'
                    ) >= moment(r.date_reserved)
                    && (
                        moment(targetReservation.date_reserved).add(targetReservation.duration, 'hours') <=
                        moment(r.date_reserved).add(r.duration, 'hours')
                    )
                )
                && r.service_id == targetReservation.service.id
            ) {
                throw new Error('Chosen time already booked');
            }
        });

        await axios.db.patch(`/reservations/${id}`, {
            is_confirmed: true,
            is_finished: false,
        });

        res.send('SUCCESS');
    } catch (error) {
        next(error);
    }
});

router.patch('/:id/close', verify.admin, async (req, res, next) => {
    try {
        const id = req.params.id;

        await axios.db.patch(`/reservations/${id}`, {
            is_confirmed: false,
            is_finished: true,
        });

        res.send('SUCCESS');
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
