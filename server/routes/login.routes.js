const loginController = require('../controllers/login.controller');
const registerController = require('../controllers/register.controller');

const express = require('express');
const router = express.Router();

const initLoginRoutes = (app) => {
    router.get("/login", loginController.getPageLogin);
    router.get("/register", registerController.getPageRegister);

    return app.use("/", router);
};
module.exports = initLoginRoutes;

