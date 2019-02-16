const express = require('express');
const verify = require('./../../auth/verify');
const axios = require('./../../config/axios');

const router = express.Router();

router.get('/', verify.admin, async (req, res, next) => {
    try {
        const { include_deleted } = req.body;
        const services = await axios.db.get('/services', {
            include_deleted
        });
        res.send(services.data);
    } catch (error) {
        next(error);
    }
});

router.post('/', verify.admin, async (req, res, next) => {
    try {
        const {
            name, description, cost, duration,
        } = req.body;
        const service = await axios.db.post('/services', {
            name,
            description,
            cost,
            duration,
        });
        res.send(service.data);
    } catch (error) {
        next(error);
    }
});

router.patch('/', verify.admin, async (req, res, next) => {
    try {
        const {
            id,
            name,
            description,
            cost,
            duration,
        } = req.body;
        const service = await axios.db.patch(`/services/${id}`, {
            name,
            description,
            cost,
            duration,
        });
        res.send(service.data);
    } catch (error) {
        next(error);
    }
});

router.delete('/', verify.admin, async (req, res, next) => {
    try {
        const { ids } = req.body;
        const deleted_services = await axios.db.delete('/services', {
            data: {
                ids,
            },
        });

        res.send(deleted_services.data);
    } catch (error) {
        next(error);
    }
})

module.exports = router;
