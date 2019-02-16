const passportInstance = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const axios = require('./../config/axios');

const configure = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        axios.db.get(`http://db-cli:5001/users/${id}`).then((res) => {
            const user = res.data;

            if (!user) {
                throw new Error('User does not exist.');
            }

            return done(null, user);
        }).catch(err => done(err));
    });

    passport.use('user', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    },
    (email, password, done) => {
        axios.db.get(
            'http://db-cli:5001/users/email',
            {
                params: {
                    email,
                },
            },
        ).then((userRes) => {
            const user = userRes.data;

            if (!Object.keys(user).length) {
                return done(null, false);
            }

            bcrypt.compare(password, user.password).then((res) => {
                if (res && user.is_verified) {
                    return done(null, user);
                }
                return done(null, false);
            });
        }).catch(err => done(err));
    }));

    passport.use('admin', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    },
    (email, password, done) => {
        axios.db.get(
            'http://db-cli:5001/admins/email',
            {
                params: {
                    email,
                },
            },
        ).then((adminRes) => {
            const admin = adminRes.data;

            if (!Object.keys(admin).length) {
                return done(null, false);
            }

            bcrypt.compare(password, admin.password).then((res) => {
                if (res) {
                    return done(null, admin);
                }
                return done(null, false);
            });
        }).catch(err => done(err));
    }));

    return passport;
};

module.exports = configure(passportInstance);
