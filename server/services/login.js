const config = require('../modules/config');
const db = require('./db');

function login(req,res){
    res.render("login", {
        url: 'http://localhost:7000/login',
        // Kirim juga flash yang telah diset

    });
}

function loginAuth(req, res){
    // butuh username dan password

} 


