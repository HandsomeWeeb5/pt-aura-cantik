const DBconnection = require('../config/dbconn.config');
const helper = require('../config/helper.config');

const addItemBarang = (data) => {
    return new Promise(async (resolve, reject) => {
        //data yang dimasukkan: deskripsi barang, tgl_pemasukan, jenis_barang, waktu, merek_brg, harga_per_unit, vendor_item, hs_code, barcode_brg, img_barang
        let dataBarang = {
            deskripsi_brg: data.deskripsi_brg,
            tgl_pemasukan: data.tgl_pemasukan,
            jenis_barang: data.jenis_barang,
            waktu: data.waktu,
            merek_brg: data.merek_brg,
            harga_per_unit: data.harga_per_unit,
            vendor_item: data.vendor_item,
            hs_code: data.hs_code,
            barcode_brg: data.barcode_brg,
            img_barang: data.img_barang
        }
        
        // Query insert to view table per page        
        DBconnection.query(
            `SELECT b.id_barang, b.deskripsi_brg, d.tgl_pemasukan, j.jenis_barang, b.waktu, b.merek_brg, b.harga_per_unit, b.vendor_item, b.hs_code, b.barcode_brg, b.img_barang FROM tb_barang AS b JOIN tb_dokumen AS d ON (b.id_dokumen = d.id_dokumen) JOIN tb_jenis_barang AS j ON (b.id_jenis_brg = j.id_jenis_brg)`, dataBarang, (err) => {
                if (err) {
                    reject(false);
                }
                resolve("Pembuatan Data Sukses");
            } 
        )
    })
};

//* /api/tutorials?page=1&size=5
//* /api/tutorials?size=5
//* /api/tutorials?title=data&page=1&size=3
//* /api/tutorials/published?page=2
const viewBarang = () => {
    return new Promise(async (resolve, reject) => {
        let sql = "SELECT b.id_barang, b.deskripsi_brg, d.tgl_pemasukan, j.jenis_barang, b.waktu, b.merek_brg, b.harga_per_unit, b.vendor_item, b.hs_code, b.barcode_brg, b.img_barang FROM tb_barang AS b JOIN tb_dokumen AS d ON (b.id_dokumen = d.id_dokumen) JOIN tb_jenis_barang AS j ON (b.id_jenis_brg = j.id_jenis_brg) ORDER BY b.id_barang;"
    
        DBconnection.query(sql, (err, result) => {
            if (err) reject(err);
            // result.length > 0 ? resolve(true) : resolve(false);
            if(result.length > 0){
                resolve(result)
            } else {
                resolve(false)
            }
        })
    })
    
}

const viewBarangPerPage = (page = 1, items) => {
    const offset = helper.getOffset(page, items)
    return new Promise (async (resolve, reject) => {
        DBconnection.query(`SELECT b.id_barang, b.deskripsi_brg, d.tgl_pemasukan, j.jenis_barang, b.waktu, d.no_dokumen_bc, b.merek_brg, b.harga_per_unit, b.vendor_item, b.hs_code, b.barcode_brg, b.img_barang FROM tb_barang AS b JOIN tb_dokumen AS d ON (b.id_dokumen = d.id_dokumen) JOIN tb_jenis_barang AS j ON (b.id_jenis_brg = j.id_jenis_brg) ORDER BY b.id_barang LIMIT ${items} OFFSET ${offset}; `, (err, results) => {
            if(err){
                reject(err);
            } else if (results){
                resolve(results);
            }
        });
    })
}

module.exports = {
    viewBarang: viewBarang,
    viewBarangPerPage: viewBarangPerPage
}

/*
+> viewBarangPerPage = tampilkan jumlah barang per halaman didalam table (pagination)
1). Algoritma:
    const resultsPerPage = 10 => menampilkan berapa hasil yang ditampilkan per halaman

    const numOfResults = result.length => page_numbers

    variable numberOfPages = Math.ceil(numOfResults / resultsPerPage)
    !! Dicek dulu numberOfPages dengan console.log(numberOfPages)

    variable let page = req.query.page ? Number(req.query.page) : 1;
    !! Dicek dulu req.query.page dengan console.log(req.query.page) & console.log(page)

    Route Params untuk mengarah halaman ke berapa yang dituju:
    +> ('localhost:7000/?page={numberOfPages}');
        jika page melebihi dari numberOfPages
    +> ('localhost:7000/?page=1');
        jika page kurang dari 1
    if (page > numberOfPages){
        res.redirect('/?page=' + encodeURIComponent(numberOfPages));
    } else if (page < 1){
        res.redirect('/?page=' + encodeURIComponent('1'))
    }
    
    Menghitung limit page_number dengan rumus
    const startingLimit = (page - 1) * resultsPerPage;

    QUERY pagination: 
    SELECT b.id_barang, b.deskripsi_brg, d.tgl_pemasukan, j.jenis_barang, b.waktu, b.merek_brg, b.harga_per_unit, b.vendor_item, b.hs_code, b.barcode_brg, b.img_barang FROM tb_barang AS b JOIN tb_dokumen AS d ON (b.id_dokumen = d.id_dokumen) JOIN tb_jenis_barang AS j ON (b.id_jenis_brg = j.id_jenis_brg) LIMIT {startingLimit} OFFSET {resultsPerPage}; 

    db.query(sql, (err, result) => {
        if (err) throw err;
        let iterator = (page - 5) < 1 ? 1 : page - 5;
        let endingLink = (iterator + 9) <= numberOfPages ? (iterator + 9) : page + (numberOfPages - page);
        if(endingLink < (page + 4)){
            iterator -= (page + 4) - numberOfPages;
        }
        res.render('pemasukan', { data: result, page, iterator, endingLink, number })
    })         

2). Pagination bs5 => Pemasukan.ejs:
    <nav aria-label="...">
        <ul class="pagination">
            <li class="page-item disabled">
                <% if(page > 1) { %>
                    <a class="page-link" href="#" tabindex="-1">Previous</a>
                <% } %>
                <% else { %>
                    <a class="page-link" href="#" tabindex="-1" aria-disabled="true">Previous</a>
                <% } %>
            </li>
            <% for(let i = iterator; i <= endingLink; i++) { %>
                <% if(i === page) { %>
                    <li class="page-item active" aria-current="page">
                        <a class="page-link" href="/?page=<%=i%>"><%=i%></a>
                    </li>
                    <% continue; %>
                <% } %>
                <li class="page-item active" aria-current="page">
                    <a class="page-link" href="/?page=<%=i%>"><%=i%></a>
                </li>
            <% } %>
            <% if (page < numberOfPages) { %>
                <li class="page-item">
                    <a class="page-link" href="/?page=<%=page + 1 %>">Next</a>
                </li>
            <% } %>
        </ul>
    </nav>
*/