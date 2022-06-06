/*======= DATABASE MYSQL CONTROL ============*/
const mariadb = require('mariadb');

//* Ambil semua dari file env
require('dotenv').config();

let instance = null;

//* Koneksi database dari mysql phpmyadmin
const connection = mariadb.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
})

