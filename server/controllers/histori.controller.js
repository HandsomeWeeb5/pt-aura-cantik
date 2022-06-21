let handleHistori = async (req, res) => {
    return res.render('histori', {
        user: req.user
    });
}

module.exports = {
    handleHistori: handleHistori
}