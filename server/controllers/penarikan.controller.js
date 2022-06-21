let handlePenarikan = async (req, res) => {
    return res.render('penarikan', {
        user: req.user
    });
}

module.exports = {
    handlePenarikan: handlePenarikan
}