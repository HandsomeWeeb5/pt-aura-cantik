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

//* Set view Engine EJS
app.set("view engine", 'ejs'); 

//* buat Static files
//app.use(express.static('./public'))

/* ======== RENDER PAGES WITH URL ======== */
app.get('/', (res, req) => {
    
})

/*======== MULTIPLE PAGE ROUTER ==========*/