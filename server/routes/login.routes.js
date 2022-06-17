const loginController = require('../controllers/login.controller');
const registerController = require('../controllers/register.controller');
const pemasukanController = require('../controllers/pemasukan.controller');
const auth = require('../validation/auth.validation');
const passport = require('passport');
const initPassportLocal = require('../controllers/passport.local.controller');

const express = require('express');
const router = express.Router();

// Pasang semua passport api
initPassportLocal();

const initLoginRoutes = (app) => {
    router.get("/", loginController.checkLoggedIn, pemasukanController.handlePemasukan); // Login ke Pemasukan Page
    router.get("/login", loginController.checkLoggedOut, loginController.getPageLogin); // Logout dari Pemasukan
    router.post("/login", passport.authenticate("local", {
        successRedirect: "/", 
        failureRedirect: "/login",
        successFlash: true,
        failureFlash: true
    })) // Mengecek apakah user sudah benar ada sebelum memasuki halaman home dengan passport
    router.get("/register", registerController.getPageRegister); // Memasuki halaman register
    router.post("/register", auth.validateRegister, registerController.createNewUser); // Pasang akun ke dalam database yang akan dijadikan login
    router.post("/logout", loginController.postLogOut); // Logout Akun ke login

    return app.use("/", router);
};
module.exports = initLoginRoutes;

