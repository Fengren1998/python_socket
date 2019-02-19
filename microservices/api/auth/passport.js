const passportInstance = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const axios = require('./../config/axios');

const configure = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        const { id, type } = user;
        if (type === 'user') {
            axios.db.get(`/users/${id}`).then((res) => {
                const user = res.data;
                user.type = 'user';
    
                if (!user) {
                    throw new Error('User does not exist.');
                }
    
                return done(null, user);
            }).catch(err => done(err));
        } else if (type === 'admin') {
            axios.db.get(`/admins/${id}`).then((res) => {
                const user = res.data;
                user.type = 'admin'

                if (!user) {
                    throw new Error('User does not exist.');
                }

                return done(null, user);
            }).catch(err => done(err));
        }
    });

    passport.use('user', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    },
    (email, password, done) => {
        axios.db.get(
            '/users/email',
            {
                params: {
                    email,
                },
            },
        ).then((userRes) => {
            const user = userRes.data;
            user.type = 'user';

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
            '/admins/email',
            {
                params: {
                    email,
                },
            },
        ).then((adminRes) => {
            const admin = adminRes.data;
            admin.type = 'admin';

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
