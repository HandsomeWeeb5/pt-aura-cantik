const barangService = require('../services/barang.service');

let handlePemasukan = async (req, res) => {
    return res.render('pemasukan', {
        user: req.user
    });
}

const viewBarang = async(req, res) => {
    try {
        res.json(await barangService.viewBarang());
    } 
    catch (error) {
        console.error('Kesalahan penampilan Barang. Error terdeteksi: ' + error.message);
    }
}

// Pagination
const viewBarangPerPage = async(req, res) => {
    let { page, dataPerPage } = req.query;
    dataPerPage = 5;
    const results = await barangService.viewBarangPerPage(page, 5);
    try{
        res.json(results);
    }
    catch (err) {
        console.error('Kesalahan Penampilan Barang: ', err.message);
    }
}

//
module.exports = {
    handlePemasukan: handlePemasukan,
    // viewBarang: viewBarang
    viewBarangPerPage: viewBarangPerPage
}