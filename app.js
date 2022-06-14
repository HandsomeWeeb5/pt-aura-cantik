//* ________ APP.JS _________
const express = require('express');
const path = require('path');
const cors = require("cors");
const connectFlash = require('connect-flash');
const session = require('express-session');
//? INFO (ejs = "Embedded JavaScript templates")
require('dotenv').config()

const PORT = process.env.PORT || 7000

const configViewEngine = require('./server/config/view.config')
const initLoginRoutes = require('./server/routes/login.routes')

//TODO ######## EXPRESS REQUIREMENT ##############
//TODO ###########################################
const app = express();
// Parsing (uraikan) data Form
app.use(express.urlencoded(
    { extended: true }
))
// Parsing (uraikan) data
app.use(express.json())
// Nyalakan pesan flash
app.use(connectFlash())
// aktifkan untuk perizinan CORS
app.use(cors());
//TODO ============================================


//*######### FUNCTION CONFIG #######################
//*#################################################
// pasang session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 864000000 1 day
    }
}));

// Pasang view engine
configViewEngine(app);

// Pasang Website Route
initLoginRoutes(app);
//*=================================================


/* ======== ERROR HANDLER MIDDLEWARE ======== */
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ message: err.message });
    return;
})

/* ====== SERVER LISTEN ======= */
app.listen(PORT, () => {
    console.log(`listening to server, click this link http://localhost:${PORT}`)
})



