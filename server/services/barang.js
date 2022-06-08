//* __________ SERVICES/BARANG.JS ________
const db = require('./db');
const helper = require('../modules/helper');
const config = require('../modules/config');

let query = `SELECT
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
JOIN tb_jenis_barang AS j ON (b.id_jenis_brg = j.id_jenis_brg);`

async function getMultiple(page = 1){
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(query);
    const data = helper.emptyOrRows(rows);
    const meta = { page };

    return { 
        data,
        meta
    }
}

module.exports = {
    getMultiple
}
