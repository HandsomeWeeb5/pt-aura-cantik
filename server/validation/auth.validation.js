const { check } = require('express-validator');

let validateRegister = [
    check("email", "Email yang dimasuki tidak benar, contoh: example123@email.com").isEmail().trim(),

    check("password", "Password tidak benar, harus diisi minimal 4 karakter huruf atau angka").isLength({ min: 4 }),

    check("confirm-password", "Konfirmasi password tidak sama seperti password").custom((value, { req }) => {
        return value === req.body.password
    })
];

module.exports = {
    validateRegister: validateRegister
}