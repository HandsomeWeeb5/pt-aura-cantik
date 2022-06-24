const express = require('express');
const router = express.Router();
const pemasukanController = require('../controllers/pemasukan.controller');
const pengeluaranController = require('../controllers/pengeluaran.controller');
const penarikanController = require('../controllers/penarikan.controller');
const historiController = require('../controllers/histori.controller');

const initBarangRoutes = (app) => {
    router.get("/pengeluaran", pengeluaranController.handlePengeluaran); // masuk ke pengeluaran
    router.get("/penarikan", penarikanController.handlePenarikan); // masuk ke penarikan
    router.get("/histori", historiController.handleHistori); // masuk ke histori
    router.get("/barang", pemasukanController.viewBarang); // Tampil barang masuk per halaman

    return app.use("/", router);
};

module.exports = initBarangRoutes;

/*
Tugas-Tugas Router barang masuk, keluar, dan histori:
TODO+). ('post')('localhost:7000/barang'), pemasukanController.addItemBarang, auth.validateItem, storage.imgUploader => Tambah data barang ke table

TODO+). ('get')('localhost:7000/barang'), pemasukanController.viewBarangPerPage => Tampil Semua data barang di dalam table Pemasukan

TODO+). ('get')('localhost:7000/barang?name={deskripsiBarang}'), pemasukanController.viewItemBarangByName => Tampil data barang sesuai deskripsi barang (nama Barang) di search bar

TODO+). ('get')('localhost:7000/barang/:tgl_pemasukan&:no_dokumen&:waktu&:merek&:harga&:jenis_barang'), pemasukanController.viewItemByFilter => Tampil data barang sesuai filter 6 input (Tgl. Pemasukan, No. Dokumen BC, Waktu, Merek Barang, Harga Per Unit, Jenis Barang)

TODO+). ('get')('localhost:7000/barang/:id'), pemasukanController.selectToEditById => Memilih barang yang akan diedit dan diubah.

TODO+). ('post')('localhost:7000/barang/:id'), pemasukanController.updateItemBarangById, auth.validateItem => Ubah input data barang per id.

TODO+). ('post')('localhost:7000/barang/kirim/:id'), pemasukanController.moveItemsBarang, pengeluaranController.getItemsPemasukan =>  Menyalin data barang ke Keranjang jual di halaman pengeluaran

TODO+). ('delete')(`localhost:7000/barang/:id`), pemasukanController.deleteItemsById => Hapus data barang di table pemasukan 

*Test REST API plug into MYSQL Database
TODO+). ('get')('localhost:7000/api/barang/'), res.status(200).json(data)
TODO+). ('post')('localhost:7000/api/barang/'), res.status(200).json(data)
TODO+). ('delete')('localhost:7000/api/barang/:id'), req.param.id => res.status(200).json(data)
TODO+). ('post')('localhost:7000/api/barang/:id'), req.param.id

1).  

1). Tambah Barang ('/post') di dalam Modal:
    =======================================
    +> addItemBarang
    1). Isi formulir berisi input (Deskripsi Barang, Tgl. Pemasukkan, Jenis Barang Option, Nama Brand, No. Dokumen BC, Harga Per Unit, Vendor Item, HS Code, Barcode Barang, Gambar Barang)
    
    2). Value dalam input tersebut yang akan memanggil Mysql untuk mencari `tb_barang` dengan query (`CALL tambahkanBarang(1?, 2?, 3?, 4?, 5?, 6?, 7?, 8?, 9?)`)
        1? => deskripsi_brg
        2? => no_dokumen_bc
        3? => nomor_jenis_barang (1 ~ 4)
        4? => merek_brg
        5? => harga_per_unit
        6? => vendor_item
        7? => hs_code
        8? => barcode_brg
        9? => img_barang
        2.1). Dalam kolom id_jenis_barang terdiri ada 4 => 1 - Kosmetik, 2 - Perhiasan, 3 - Jam Tangan, 4 - Fashion

    3). Pengisian Formulir penambahan barang di antarmuka "Modal Add Item" di "pemasukan.ejs"
        3.1). Hasil dari input tambah barang menjadi =>
              +> data.id_barang => req.body.id_barang 
              +> data.deskripsi_brg => req.body.deskripsi_brg
              +> data.jenis_barang => req.body.jenis_barang
              +> data.waktu => req.body.waktu
              +> data.merek_brg => req.body.merek_brg
              +> data.harga_per_unit => req.body.harga_per_unit
              +> data.vendor_item => req.body.vendor_item
              +> data.hs_code => req.body.hs_code
              +> data.barcode_brg => req.body.barcode_brg
              +> data.img_barang => req.file.img_barang

              3.1.1). ketika memasukkan data.harga_per_unit di formulir input ke dalam table pemasukan, gantikan type data harga_per_unit number integer ke string.  

        3.2). data.img_barang yang akan diisi oleh teks image dari folder apapun di komputer kamu, teks image itu tertulis nama image yang diupload dari folder tersebut
            3.2.1). Gunakan multer untuk menempatkan image itu kedalam database `tb_barang` kolom `img_barang` sebagai berikut:
            Siapkan storage engine
            const storage = multer.diskStorage({
                destination: path.join(__)
            })

            3.2.2). image tersebut dengan nama file akan diupload ke dalam folder directory "upload/img", folder "upload/img" adalah storage image yang diupload

        3.3). Formulir input di "Modal Add Item" bisa dihapus semua dengan tombol reset

        3.4). setiap baris item harga_per_unit di dalam kolomnya sendiri dijumlahkan semua kedalam total. "Pemasukan.ejs" 
      
2). Tampil Barang ('/get')
    Method-method pemasukan.controller:
    +> findBarangByFilter = Cari barang sesuai filter modal dropdown
        1). Filter modal yang hanya cari kolom:
            -> Tgl. Pemasukan
            -> No. Dokumen BC
            -> Waktu
            -> Merek Barang
            -> Harga Per Unit
            -> Jenis Barang (select Option)
            Untuk mencari barang sesuai filternya, querynya seperti ini: 

            "SELECT b.id_barang, b.deskripsi_brg, d.tgl_pemasukan, j.jenis_barang, b.waktu, b.merek_brg, b.harga_per_unit, b.vendor_item, b.hs_code, b.barcode_brg, b.img_barang FROM tb_barang AS b JOIN tb_dokumen AS d ON (b.id_dokumen = d.id_dokumen) JOIN tb_jenis_barang AS j ON (b.id_jenis_brg = j.id_jenis_brg) WHERE d.tgl_pemasukan = "" OR d.no_dokumen_bc = "" OR b.waktu = "" OR b.merek_brg = "" OR b.harga_per_unit = 0 AND j.jenis_barang;"

   
            
    +> selectItemById = Pilih satu item barang dengan checkbox option didalam tabel pemasukan
    1). Algoritma:
        Front End:
        $(document).ready(function() {
            $("#select-all-items").click(function() {
                var isChecked = $(this).prop("checked");
                 $('#tb_pemasukan tr:has(td)').find('input[type="checkbox"]').prop('checked', isChecked);
            });

            $('#stb_pemasukan tr:has(td)').find('input[type="checkbox"]').click(function() {
                var isChecked = $(this).prop("checked");
                var isHeaderChecked = ${"#select-all-items"}.prop("checked");
                if (isChecked == false && isHeaderChecked) {
                    $(#select-all-items).prop('checked', isChecked);
                }
                else {
                    $('tb_pemasukan tr:has(td)').find('input[type="checkbox"]').each(function() {
                        if($(this).prop("checked") == false) {
                            isChecked = false;
                        }
                    });
                    console.log(isChecked);

                    $("#select-all-item").prop('checked', isChecked);
                }
            });
        })

        Server-side:

    4). 
    
    
*/