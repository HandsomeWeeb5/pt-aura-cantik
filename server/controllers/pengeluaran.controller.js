let handlePengeluaran = async (req, res) => {
    return res.render('pengeluaran', {
        user: req.user
    });
}

module.exports = {
    handlePengeluaran: handlePengeluaran
}