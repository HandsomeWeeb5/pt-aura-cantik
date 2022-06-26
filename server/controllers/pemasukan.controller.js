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
    page ? Number(page) : 1;
    dataPerPage = 5;
    const results = await barangService.viewBarangPerPage(page, 5);
    const numberOfPages = Math.ceil(results.length / dataPerPage);

    
    if(page > numberOfPages){
        res.redirect('/?page=' + encodeURIComponent(numberOfPages));
    } else if (page < 1){
        res.redirect('/?page=' + encodeURIComponent('1'));
    }

    try{
        // res.json(results);
        let iterator = (page - 5) < 1 ? 1 : page - 5;
        let endingLink = (iterator + 9) <= numberOfPages ? (iterator + 9) : page + (numberOfPages - page);
        if(endingLink < (page + 4)){
            iterator -= (page + 4) - numberOfPages;
        }
        res.render('pemasukan', {data: results, page, iterator, endingLink, numberOfPages});
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