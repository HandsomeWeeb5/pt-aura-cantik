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
app.use(express.static(__dirname + 'public'))

/* ======== RENDER PAGES WITH URL ======== */
app.get('/', (req, res) => {
    // res.sendFile(path.join(__dirname, '/client/public/index.html'))
    res.writeHead(200, { "content-type" : "text/html" })
    res.write(readFileSync('client/index.html'))
    res.end()
})

/*======== MULTIPLE PAGE ROUTER ==========*/
app.listen(7000, () => {
    console.log('listening to server, http://localhost:7000')
})