//* __________ SERVICES/BARANG.JS ________
const db = require('./db');
const helper = require('../modules/helper');
const config = require('../modules/config');

let querySelect = `SELECT
b.id_barang,
b.deskripsi_brg,
DATE_FORMAT(d.tgl_pemasukan, '%d/%m/%y') AS tgl_pemasukan,
j.jenis_barang,
b.waktu,
b.merek_brg,
d.no_dokumen_bc,
b.harga_per_unit,
b.vendor_item,
b.hs_code,
b.barcode_brg
    FROM 
tb_barang AS b JOIN tb_dokumen AS d ON (b.id_dokumen = d.id_dokumen)
JOIN tb_jenis_barang AS j ON (b.id_jenis_brg = j.id_jenis_brg);`

// TODO let queryInsert = `CALL tambahkanBarang(${barang.deskripsi_brg}, ${barang.jenis_barang}, ${barang.merek_brg}, ${barang.harga_per_unit}, ${barang.vendor_item}, ${barang.hs_code}, ${barang.barcode_brg})`

async function getMultiple(page = 1){
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(querySelect);
    const data = helper.emptyOrRows(rows);
    const meta = { page };

    return { 
        data,
        meta
    }
}

async function insertData(barang){
    const result = await db.query(
        `CALL tambahkanBarang(${barang.deskripsi_brg}, ${barang.jenis_barang}, ${barang.merek_brg}, ${barang.harga_per_unit}, ${barang.vendor_item}, ${barang.hs_code}, ${barang.barcode_brg})`
    )

    let message = 'Penambahan data barang Gagal!'

    if(result.affectedRows){
        message = 'Penambahan data barang sukses';
    }
    return { message }
}

// TODO let queryUpdate = `CALL ubahBarang(${id}, ${barang.deskripsi_brg}, ${barang.no_dokumen_bc}, ${barang.jenis_barang}, ${barang.merek_brg}, ${barang.harga_per_unit}, ${barang.vendor_item}, ${barang.hs_code}, ${barang.barcode_brg})`

async function updateData(id, barang){
    const result = await db.query(
        `CALL ubahBarang (
            ${id},
            ${barang.deskripsi_brg},
            ${barang.no_dokumen_bc},
            ${barang.jenis_barang},
            ${barang.merek_brg},
            ${barang.harga_per_unit},
            ${barang.vendor_item},
            ${barang.hs_code},
            ${barang.barcode_brg}
        )`
    );

    let message = 'Pembaruan data barang Gagal!';

    if (result.affectedRows) {
        message = 'Pembaruan data Barang Sukses';
    }

    return {message};
}

// TODO let queryDelete = `CALL hapusBarang()`

async function removeData(id){
    const result = await db.query(
        `CALL hapusBarang(${id})`
    );

    let message = 'Penghapusan data barang Gagal!';

    if (result.affectedRows) {
        message = 'Programming language deleted successfully';
    }

    return { message };
}

module.exports = {
    getMultiple, insertData, updateData, removeData
}
