const express = require('express');
const moment = require('moment-timezone')
const verify = require('./../../auth/verify');
const axios = require('./../../config/axios');

const router = express.Router();

router.get('/', verify.user, async (req, res, next) => {
    try {
        const { include_deleted } = req.body;
        const reservations = await axios.db.get('/reservations', {
            include_deleted,
            is_confirmed: true,
        });
        res.send(reservations.data);
    } catch (error) {
        next(error);
    }
});

router.post('/', verify.user, async (req, res, next) => {
    try {
        const {
            service_id,
            duration,
            date_reserved,
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
        })
        const reservation = await axios.db.post('/reservations', {
            user_id: req.user.id,
            service_id,
            duration,
            date_reserved,
            is_confirmed: false,
        });
        res.send(reservation.data);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// router.patch('/', verify.user, async (req, res, next) => {
//     try {
//         const {
//             id,
//             user_id,
//             service_id,
//             duration,
//             date_reserved,
//         } = req.body;
//         const reservation = await axios.db.patch(`/reservations/${id}`, {
//             user_id,
//             service_id,
//             duration,
//             date_reserved,
//         });
//         res.send(reservation.data);
//     } catch (error) {
//         next(error);
//     }
// });

// router.delete('/', verify.user, async (req, res, next) => {
//     try {
//         const { ids } = req.body;
//         const deleted_reservations = await axios.db.delete('/reservations', {
//             data: {
//                 ids,
//             },
//         });

//         res.send(deleted_reservations.data);
//     } catch (error) {
//         next(error);
//     }
// })

module.exports = router;
