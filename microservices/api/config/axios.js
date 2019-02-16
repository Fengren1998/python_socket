const axios = require('axios');
const config = require('./config');

const db = process.env.NODE_ENV === 'development'
    ? axios.create()
    : axios.create({ baseURL: config.dbCliUrl });


const emailer = process.env.NODE_ENV === 'development'
    ? axios.create()
    : axios.create({ baseURL: config.emailerUrl });

module.exports = {
    db,
    emailer,
};
