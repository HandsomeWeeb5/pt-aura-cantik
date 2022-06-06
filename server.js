const express = require('express');
const axios = require('axios');
const ejs = require('ejs'); //? INFO (ejs = "Embedded JavaScript templates")


/* ======= EXPRESS REQUIREMENT ====== */
const app = express();

//* Parsing (uraikan) data Form
app.use(express.urlencoded(
    { extended: false }
))

//* Parsing (uraikan) data
app.use(express.json())



//* buat Static files
//app.use(express.static('./public'))

/* ======= TEMPLATE VIEW ENGINE FOR HTML ========= */
app.engine('ejs', ejs.renderFile);

/*======== MULTIPLE PAGE ROUTER ==========*/