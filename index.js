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
const routesCart = require("./src/routes/cart");
const routesOngkir = require("./src/routes/ongkir");

app.use("/uploads", express.static("uploads"));
app.use(cors());
app.use(express.json());

app.use(
  "/api/v1/",
  routesProduct,
  routesUsers,
  routesCategory,
  routesTransaction,
  routesProfile,
  routesCart,
  routesOngkir
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
