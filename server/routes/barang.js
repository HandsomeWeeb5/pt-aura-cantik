//* _________ ROUTES/BARANG.JS _________
const express = require('express');
const router = express.Router();
const barang = require('../services/barang');

/* GET => ambil semua data barang */
router.get('/', async function(req, res, next) {
    try {
        res.json(await barang.getMultiple(req.query.page));
    } catch (err) {
        console.error(`Error dalam pengambilan data barang `, err.message);
        next(err);
    }
})

module.exports = router;

