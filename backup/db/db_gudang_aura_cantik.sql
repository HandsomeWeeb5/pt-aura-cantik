DROP PROCEDURE IF EXISTS tambahkanBarang;

DELIMITER //
CREATE PROCEDURE tambahkanBarang(
    namaBarang VARCHAR(200),
    nomorDokumen INT(6) ZEROFILL,
    nomorJenisBarang INT(6),
    merekBarang VARCHAR(50),
    hargaPerUnit DECIMAL(10, 2),
    vendorItem VARCHAR(80),
    hsCode VARCHAR(120),
    barcodeBarang VARCHAR(120)
)
BEGIN
    /* ---- ERROR HANDLING ---- */
    DECLARE current_no_dokumen INT(6) ZEROFILL;
    DECLARE sql_error TINYINT DEFAULT FALSE;
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
    SET sql_error = TRUE;

    /* NO.DOKUMEN yang tidak diubah di tb_dokumen, akan dijadikan temp*/

    /* SELECT no_dokumen_bc INTO current_no_dokumen FROM `tb_dokumen`; */
    START TRANSACTION;

    INSERT IGNORE INTO `tb_dokumen` ( no_dokumen_bc, tgl_pemasukan )
    VALUES ( nomorDokumen, CURRENT_DATE());
    /*
    INSERT INTO `tb_dokumen` ( no_dokumen_bc, tgl_pemasukan )
    SELECT * FROM (SELECT nomorDokumen, CURRENT_DATE()) AS tmp WHERE NOT EXISTS (
        SELECT no_dokumen_bc FROM  `tb_dokumen` WHERE no_dokumen_bc = nomorDokumen
    ) LIMIT 1;
    */
        
    INSERT INTO `tb_barang` (
        deskripsi_brg,
        id_dokumen,
        id_jenis_brg,
        waktu,
        merek_brg,
        harga_per_unit,
        vendor_item,
        hs_code,
        barcode_brg
    ) VALUES (
        namaBarang,
        LAST_INSERT_ID(),
        nomorJenisBarang,
        CURRENT_TIME(),
        merekBarang,
        hargaPerUnit,
        vendorItem,
        hsCode,
        barcodeBarang
    );

    IF sql_error = FALSE THEN
        COMMIT;
        SELECT `Penambahan data sukses`;
    ELSE
        ROLLBACK;
        SELECT `Penambahan data Gagal, sesuatu kesalahan query, salah function atau memasukkan data tidak benar`;
        SHOW ERRORS;
    END IF;
END;

/* ======= Ubah Data Barang ======= */
DROP PROCEDURE IF EXISTS ubahBarang;
/* ===== HAL-HAL YANG DIPERHATIKAN dalam mengubah barang ===== 
+). Data yang akan diubah
    1). Nama Barang (Deskripsi Barang)
    2). Jenis Barang
    3). Waktu
    4). Merek Barang
    5). Harga Per Unit
    6). Vendor Item
    7). HS Code
    8). Barcode Barang
+), Data yang tidak dapat diubah
    1). Nomor Dokumen BC
    2). Tanggal Pemasukan
+). Nomor Dokumen BC tidak bisa diubah jika Nomor itu sudah disimpan di dalam Option HTML
+). Jenis Barang bisa diubah dengan nomor
+). Tanggal Pemasukkan tidak bisa diubah
+). Waktu dapat diubah otomatis jika data barang telah diubah 
*/

DELIMITER //
CREATE PROCEDURE ubahBarang(
    idTarget INT(11),
    u_namaBarang VARCHAR(200),
    u_nomorDokumen INT(6) ZEROFILL,
    u_nomorJenisBarang INT(6),
    u_merekBarang VARCHAR(50),
    u_hargaPerUnit DECIMAL(10, 2),
    u_vendorItem VARCHAR(80),
    u_hsCode VARCHAR(120),
    u_barcodeBarang VARCHAR(120)
)
BEGIN
    /* ---- ERROR HANDLING ---- */
    DECLARE sql_error TINYINT DEFAULT FALSE;
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
    SET sql_error = TRUE;
	SELECT @id_target := idTarget;
    
    START TRANSACTION;
    UPDATE `tb_barang` AS b, `tb_dokumen` AS d
    SET
    	b.deskripsi_brg = u_namaBarang,
    	d.no_dokumen_bc = u_nomorDokumen,
    	b.id_jenis_brg = u_nomorJenisBarang,
    	b.merek_brg = u_merekBarang,
    	b.harga_per_unit = u_hargaPerUnit,
    	b.vendor_item = u_vendorItem,
    	b.hs_code = u_hsCode,
    	b.barcode_brg = u_barcodeBarang
    WHERE idTarget = b.id_barang AND b.id_barang = d.id_dokumen;

    IF sql_error = FALSE THEN
        COMMIT;
        SELECT `Penambahan data sukses`;
    ELSE
        ROLLBACK;
        SELECT `Penambahan data Gagal, kesalahan query atau memasukkan data tidak benar`;
        SHOW ERRORS;
    END IF;
END //

BEGIN
    /* ---- ERROR HANDLING ---- */
    DECLARE sql_error TINYINT DEFAULT FALSE;
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
    SET sql_error = TRUE;
	
    START TRANSACTION;
    DELETE FROM `tb_barang` INNER JOIN `tb_dokumen` ON (tb_barang.id_dokumen = tb_dokumen.id_dokumen) WHERE id_barang = idTarget;
    
    IF sql_error = FALSE THEN
        COMMIT;
        SELECT `Penambahan data sukses`;
    ELSE
        ROLLBACK;
        SELECT `Penambahan data Gagal, kesalahan query atau memasukkan data tidak benar`;
        SHOW ERRORS;
    END IF;
END