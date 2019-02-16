const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'email-smtp.us-west-2.amazonaws.com',
    auth: {
        user: 'AKIAIFJ424JKNO4RFXYA',
        pass: 'Au/V0iwDWokMLzlhST/s/kIraNph24tYDySTRscRUUwt',
    },
});

transporter.verify((error, success) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Server is ready to take our messages');
    }
});

module.exports = transporter;
