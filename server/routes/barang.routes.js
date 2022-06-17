const express = require('express');
const router = express.Router();
let pemasukanController, pengeluaranController, historiController;

/*
1). Tambah Barang ('/post') di dalam Modal:
    =======================================
    INPUT DATA UNTUK addItemBarang
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
        2.2). 

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

        3.2). data.img_barang yang akan diisi oleh teks image dari folder apapun di komputer elu, teks image itu tertulis nama image yang diupload dari folder tersebut
            3.2.1). Gunakan imageFile.mv(uploadPath) untuk menempatkan image itu kedalam database `tb_barang` kolom `img_barang` dengan plugin import "express-fileupload"
            3.2.2). image tersebut dengan nama file akan diupload ke dalam folder directory "upload/img", folder "upload/img" adalah storage image yang diupload

        3.3). Formulir input di "Modal Add Item" bisa dihapus semua dengan tombol reset
            
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

        +> viewBarangPerPage = tampilkan jumlah barang per halaman didalam table (pagination)
            1). Algoritma:
                Variable resultPerPage = 10 <= default
                Variable numberOfResult = result.length
                Variable numberOfPages = Math.ceil(numberOfResult / )
            2). 

        +> 

    4). 
    
    
*/