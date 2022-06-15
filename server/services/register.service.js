const DBconnection = require('../config/dbconn.config');
const bcrypt = require('bcryptjs');

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        // periksa email ada atau tidak
        let isEmailExist = await checkExistEmail(data.email);
        if (isEmailExist) {
            reject(`Email "${data.email}" telah ada yang dipakai. Tolong buatlah email lainnya`);
        } else {
            // menggunakan hash password
            let salt = bcrypt.genSaltSync(10);
            let userItem = {
                username: data.username,
                email: data.email,
                password: bcrypt.hashSync(data.password, salt),
                fullname: data.fullname
            }

            // buat akun (account) baru
            DBconnection.query(
                ` INSERT INTO tb_users set ? `, userItem,
                function(err, rows) {
                    if (err) {
                        reject(false)
                    }
                    resolve("Create a new user successful");
                }
            )    
        }
    })
};

let checkExistEmail = (email) => {
    return new Promise( (resolve, reject) => {
        try{
            DBconnection.query('SELECT * FROM `tb_users` WHERE `email` = ? ', email, (err, rows) => {
                if (err){
                    reject(err)
                }
                if (rows.length > 0){
                    resolve(true)
                } else {
                    resolve(false)
                }
            });
        } catch (err){
            reject(err);
        }
    })
}

module.exports = {
    createNewUser: createNewUser,
    checkExistEmail: checkExistEmail
}

