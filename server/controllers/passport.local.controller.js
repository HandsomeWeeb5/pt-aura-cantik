const passport = require('passport');
const passportLocal = require('passport-local');
const loginService = require('../services/login.service');

let LocalStrategy = passportLocal.Strategy;

const initPassportLocal = () => {
    passport.use(new LocalStrategy ({
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true
        },
        async (req, username, password, done) => {
            try {
                await loginService.findUserByUsername(username).then(async (user) => {
                    if (!user) {
                        return done(null, false, req.flash("errors", `Username anda masukkan "${username}" tidak ada!`))
                    }
                    if (user) {
                        let match = await loginService.comparePassword(password, user);
                        if (match === true) {
                            return done(null, user, null)
                        } else {
                            return done(null, false, req.flash('errors', match))
                        }
                    }
                })
            } catch (err) {
                console.log(err);
                return done(null, false, { message: err });
            }
        }
    ))
}

passport.serializeUser((user, done) => {
    done(null, user.id_user); // panggil id_user kepada login.service
});

passport.deserializeUser((id, done) => {
    loginService.findUserById(id).then((user) => {
        return done(null, user);
    }).catch(error => {
        return done(error, null)
    })
});

module.exports = initPassportLocal;