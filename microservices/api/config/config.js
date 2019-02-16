let dbCliUrl = 'http://db-cli:5001';
let emailerUrl = 'http://emailer:1080';

if (process.env.EXPRESS_APP_ENV === 'staging') {
    dbCliUrl = 'AWS_STG_DBCLI';
    emailerUrl = 'AWS_STG_EMAILER';
} else if (process.env.EXPRESS_APP_ENV === 'production') {
    dbCliUrl = 'http://db-cli';
    emailerUrl = 'AWS_PROD_EMAILER';
}

module.exports = {
    dbCliUrl,
    emailerUrl,
};
