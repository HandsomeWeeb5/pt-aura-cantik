const DBconnection = require('../config/dbconn.config');
const bcrypt = require('bcryptjs');

// handle login
let handleLogin = (username, password) => {
    return new Promise(async (resolve, reject) => {
        // Periksa username ada atau tidak
        let user = await findUserByUsername(username);
        if (user) {
            // Compare Password
            await bcrypt.compare(password, user.password).then((isMatch) => {
                if (isMatch){
                    resolve(true);
                } else {
                    reject(`The password that you've entered is incorrect`);
                }
            });
        } else {
            reject(`Username yang anda masukkan tidak ada`);
        }
    });
};

// cari user dengan username yang akan ditemukan
let findUserByUsername = (username) => {
    return new Promise((resolve, reject) => {
        try{
            DBconnection.query(
               ' SELECT * FROM `tb_users` WHERE `username` = ? ', email, 
               function(err, rows) {
                    if (err) {
                        reject(err)
                    }
                    let user = rows[0];
                    resolve(user);
               } 
            );
        } catch (err) {
            reject(err);
        }
    });
}

let findUserById = (id) => {
    
}