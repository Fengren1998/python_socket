const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'email-smtp.us-west-2.amazonaws.com',
    auth: {
        user: 'AKIAI2XQXVWXUCVZEF4Q',
        pass: 'BL196zAWhR0BlcKfhMcfVpaKN1yKNaThoS1cGdVR6F2j',
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
