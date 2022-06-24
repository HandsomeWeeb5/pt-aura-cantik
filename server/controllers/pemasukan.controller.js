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
//
module.exports = {
    handlePemasukan: handlePemasukan,
    viewBarang: viewBarang
}