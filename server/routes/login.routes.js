const loginController = require('../controllers/login.controller');
const registerController = require('../controllers/register.controller');
const pemasukanController = require('../controllers/pemasukan.controller');
const auth = require('../validation/auth.validation');
const passport = require('passport');
const initPassportLocal = require('../controllers/passport.local.controller');

const express = require('express');
const router = express.Router();

// Pasang semua passport
initPassportLocal();

const initLoginRoutes = (app) => {
    router.get("/", loginController.checkLoggedIn, pemasukanController.handlePemasukan);
    router.get("/login", loginController.checkLoggedOut, loginController.getPageLogin);
    router.post("/login", passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
        successFlash: true,
        failureFlash: true
    }))
    router.get("/register", registerController.getPageRegister);
    router.post("/register", auth.validateRegister, registerController.createNewUser);
    router.post("/logout", loginController.postLogOut);

    return app.use("/", router);
};
module.exports = initLoginRoutes;

