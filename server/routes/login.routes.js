const loginController = require('../controllers/login.controller');
const registerController = require('../controllers/register.controller');
const auth = require('../validation/auth.validation');
const passport = require('passport');

const express = require('express');
const router = express.Router();

const initLoginRoutes = (app) => {
    router.get("/login", loginController.getPageLogin);
    router.post("/login", passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
        successFlash: true,
        failureFlash: true
    }))
    router.get("/register", registerController.getPageRegister);
    router.post("/register", auth.validateRegister, registerController.createNewUser);

    return app.use("/", router);
};
module.exports = initLoginRoutes;

