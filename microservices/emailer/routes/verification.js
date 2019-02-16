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
            text: `Verify your email here: http://localhost/email-verification/verify?hash=${hash}&email=${email}`,
        }

        await transporter.sendMail(message)

        res.send('Email sent successfully.');
    } catch (err) {
        next(err);
    }
});

router.post('/success', async (req, res, next) => {
    try {
        const { email } = req.body;
        const message = {
            from: 'levymedina2@gmail.com',
            to: email,
            subject: 'PaperWorkPH - Email Verification Successful',
            text: `You have successfully verified your email.`,
        }

        await transporter.sendMail(message)

        res.send('Email sent successfully');
    } catch (err) {
        next(err);
    }
});

module.exports = router;
