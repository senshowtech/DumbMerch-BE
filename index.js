require("dotenv").config();
const express = require("express");

const cors = require("cors");

const http = require("http");
const { Server } = require("socket.io");

const routesProduct = require("./src/routes/product");
const routesUsers = require("./src/routes/user");
const routesCategory = require("./src/routes/category");
const routesTransaction = require("./src/routes/transaction");
const routesProfile = require("./src/routes/profile");
const routesCart = require("./src/routes/cart");
const routesOngkir = require("./src/routes/ongkir");
const routeTodo = require("./src/routes/todo");

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      "https://www.dumbmerch.febrisena.xyz",
      "https://dumbmerch.febrisena.xyz",
    ], // we must define cors because our client and server have diffe
  },
});

require("./src/socket")(io);

const port = process.env.PORT || process.env.Port;

app.use(express.json());
app.use(cors());

app.use("/uploads", express.static("uploads"));
app.use(
  "/api/v1/",
  routesProduct,
  routesUsers,
  routesCategory,
  routesTransaction,
  routesProfile,
  routesCart,
  routeTodo,
  routesOngkir
);

server.listen(port, () => console.log(`Listening on port ${port}`));
