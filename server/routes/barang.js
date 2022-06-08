//* _________ ROUTES/BARANG.JS _________
const express = require('express');
const { route } = require('express/lib/application');
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

/* POST => buat data barang baru */
router.post('/', async function(req, res, next) {
    try{
        res.json(await barang.insertData(req.body));
    } catch (err) {
        console.error(`Error dalam pembuatan data barang`, err.message);
        next(err);
    }
})

/* PUT => ubah data barang sesuai id */
router.put('/:id', async function(req, res, next) {
    const { id } = req.params
    try{
        res.json(await barang.updateData(id, req.body));
    } catch (err) {
        console.error(`Error dalam pembaruan data Barang`, err.message);
        next(err);
    }
})

/* DELETE => hapus data barang sesuai id */
router.delete('/:id', async function(req, res, next) {
    try{
        res.json(await barang.removeData(req.params.id));
    } catch (err) {
        console.error(`Error dalam penghapusan data barang`, err.message);
        next(err);
    }
})

module.exports = router;

