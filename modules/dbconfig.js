/*======= DATABASE MYSQL CONTROL ============*/
const mariadb = require('mariadb');

//* Ambil semua dari file env
require('dotenv').config();

//* instance database
let instance = null;

//* Koneksi database dari mysql phpmyadmin
const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    connectionLimit: 100
})

//* Query to display all table
const sql = `SELECT
        b.deskripsi_brg,
        DATE_FORMAT(d.tgl_pemasukan, '%d/%m/%y') AS tgl_pemasukan,
        j.jenis_barang,
        b.waktu,
        b.merek_brg,
        b.harga_per_unit,
        b.vendor_item,
        b.hs_code,
        b.barcode_brg
    FROM 
tb_barang AS b JOIN tb_dokumen AS d ON (b.id_dokumen = d.id_dokumen)
JOIN tb_jenis_barang AS j ON (b.id_jenis_brg = j.id_jenis_brg)`;

const testDb = pool.getConnection()
 .then(conn => {

    conn.query("SELECT 1 as value")
        .then((rows) => {
            console.log(rows); //[ {val: 1}, meta: ... ]
            
            return conn.query(sql);
        })
        .then((res) => {
            console.log(res);
            conn.end();
        })
        .catch(err => {
            //handle error
            console.log(err);
            conn.end()
        })
 }).catch(err => {
     // not connected
     console.log("Database connection failed")
 })

 module.exports = testDb;