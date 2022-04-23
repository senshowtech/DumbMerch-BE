const express = require("express");
const router = express.Router();
const { Provinsi, Kota, Ongkos } = require("../controller/ongkir");

router.get("/provinsi", Provinsi);
router.get("/kota/:provId", Kota);
router.get("/ongkos/:asal/:tujuan/:berat/:kurir", Ongkos);

module.exports = router;
