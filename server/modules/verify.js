//* __________ MODULES/VERIFY.JS ___________
function isLogin(req, res, next){
    if(req.session.loggedin === true){
        next();
        return;
    } else {
        req.session.destroy(function(err) {
            res.redirect('/login');
        })
    }
}

function isLogout(req, res, next){
    if(req.session.loggedin !== true){
        next();
        return;
    }
    res.redirect('/');
}

module.exports = { isLogin, isLogout };