//* ________ APP.JS _________
const express = require('express');
const cors = require("cors");
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const configViewEngine = require('./server/config/view.config')
const initLoginRoutes = require('./server/routes/login.routes');
const initBarangRoutes = require('./server/routes/barang.routes');
//? INFO (ejs = "Embedded JavaScript templates")
require('dotenv').config()

const PORT = process.env.PORT || 7000

const app = express();
// Parsing (uraikan) data Form
app.use(express.urlencoded(
    { extended: true }
))
// Parsing (uraikan) data
app.use(express.json())
// aktifkan untuk perizinan CORS
app.use(cors());

// Pasang session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 864000000 1 day
    }
}));

// Pasang cookie parser
app.use(cookieParser('secret'));

// Pasang view engine
configViewEngine(app);

// Nyalakan pesan flash
app.use(flash())

// Pasang dan atur passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Pasang Website Route
initLoginRoutes(app); // login system
initBarangRoutes(app); // route barang control

/* ====== SERVER LISTEN ======= */
app.listen(PORT, () => {
    console.log(`listening to server, click this link http://localhost:${PORT}`)
})



