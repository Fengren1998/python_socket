const express = require('express');
const transporter = require('./../config/smtp');

const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        const { email, hash } = req.body;
        const message = {
            from: 'levymedina2@gmail.com',
            to: email,
            subject: 'PaperWorkPH - Email Verification Required',
            text: `Reset your password here: http://localhost/forgot-password/reset?hash=${hash.hash}&email=${email}`,
        }

        await transporter.sendMail(message)

        res.send('Email sent successfully.');
    } catch (err) {
        next(err);
    }
});

module.exports = router;
