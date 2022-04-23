require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.Port;
const cors = require("cors");

const routesProduct = require("./src/routes/product");
const routesUsers = require("./src/routes/user");
const routesCategory = require("./src/routes/category");
const routesTransaction = require("./src/routes/transaction");
const routesProfile = require("./src/routes/profile");
const routesOngkir = require("./src/routes/ongkir");

app.use("/uploads", express.static("uploads"));
app.use(cors());
// app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", routesOngkir);

app.use(
  "/api/v1/",
  routesProduct,
  routesUsers,
  routesCategory,
  routesTransaction,
  routesProfile
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
