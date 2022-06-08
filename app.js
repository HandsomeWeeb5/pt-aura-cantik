//* ______ APP.JS _________
const express = require('express');
const axios = require('axios');
const path = require('path');
const { readFileSync } = require('fs'); 
const cors = require("cors");
const ejs = require('ejs'); //? INFO (ejs = "Embedded JavaScript templates")

const barangRouter = require('./server/routes/barang');
require('dotenv').config()

const PORT = process.env.PORT || 7000

/* ======= EXPRESS REQUIREMENT ====== */
const app = express();

//* Parsing (uraikan) data Form
app.use(express.urlencoded(
    { extended: true }
))

//* Parsing (uraikan) data
app.use(express.json())

//* buat Static files
app.use(express.static('client/public'))

//* Set view engine
app.set('views', './client/views')
app.set('view engine', 'ejs')

/* ======== RENDER PAGES WITH URL ======== */
app.get('/', (req, res) => {
    res.render('pemasukan')
})
     
app.get('/pengeluaran', (req, res) => {
    res.render('pengeluaran')
})

// app.engine('ejs', ejs)

/*======== MULTIPLE PAGE ROUTER ==========*/
//* test route id barang

app.use('/barang' ,barangRouter);

/* ======== ERROR HANDLER MIDDLEWARE ======== */
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ message: err.message });
    return;
})

/* ====== SERVER LISTEN ======= */
app.listen(PORT, () => {
    console.log(`listening to server, http://localhost:${PORT}`)
})


