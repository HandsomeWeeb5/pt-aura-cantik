let handlePemasukan = async (req, res) => {
    return res.render('pemasukan', {
        user: req.user
    });
}

module.exports = {
    handlePemasukan: handlePemasukan
}