const express = require('express');
const axios = require('axios');
const path = require('path');
const { readFileSync } = require('fs'); 
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
app.listen(7000, () => {
    console.log('listening to server, http://localhost:7000')
})

