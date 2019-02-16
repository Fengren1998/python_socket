const express = require('express');
const transporter = require('./../config/smtp');

const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        const { from, to } = req.body;
        const message = {
            from,
            to,
            subject: 'Test Email',
            text: 'This is a test message',
        }
        
        await transporter.sendMail(message)

        res.send('Email sent successfully');
    } catch (err) {
        next(err);
    }
});

module.exports = router;
