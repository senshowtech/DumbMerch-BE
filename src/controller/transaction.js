const { transaction, product, profile, user } = require("../../models");
const midtransClient = require("midtrans-client");

exports.getAllTransaction = async (req, res) => {
  try {
    const id = req.user.id;
    const dataTransaction = await transaction.findAll({
      where: {
        idBuyer: id,
      },
      include: [
        {
          model: product,
          as: "product",
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "idUser",
              "qty",
              "price",
              "kurir",
            ],
          },
        },
        {
          model: user,
          as: "buyer",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password", "status"],
          },
        },
        {
          model: user,
          as: "seller",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password", "status"],
          },
        },
      ],
      attributes: {
        exclude: ["updatedAt"],
      },
    });

    let transactions = [];
    if (dataTransaction !== null) {
      dataTransaction.forEach((value) => {
        let data = {
          id: value.id,
          product: value.product,
          buyer: value.buyer,
          seller: value.seller,
          price: value.price,
          status: value.status,
          date: value.createdAt,
        };
        transactions.push(data);
      });
    }

    return res.status(201).json({
      status: "succes",
      data: {
        transactions,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "failed",
      error: "server error",
    });
  }
};

exports.AddTransaction = async (req, res) => {
  try {
    const transactionCreate = await transaction.create({
      ...req.body,
      id: parseInt(req.body.idProduct + Math.random().toString().slice(3, 8)),
      idBuyer: req.user.id,
      status: "pending",
    });

    const buyerData = await user.findOne({
      include: {
        model: profile,
        as: "profiles",
        attributes: {
          exclude: ["createdAt", "updatedAt", "idUser"],
        },
      },
      where: {
        id: transactionCreate.idBuyer,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });

    let snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY,
    });

    let parameter = {
      transaction_details: {
        order_id: transactionCreate.id,
        gross_amount: transactionCreate.price,
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        first_name: buyerData?.name,
        email: buyerData?.email,
        phone: "0" + buyerData?.profiles.phone,
      },
    };

    const payment = await snap.createTransaction(parameter);

    return res.status(201).json({
      status: "succes",
      data: {
        transaction: {
          id: transactionCreate.id,
          idProduct: transactionCreate.idProduct,
          idBuyer: req.user.id,
          idSeller: transactionCreate.idSeller,
          price: transactionCreate.price,
          status: "pending",
          message: "Pending transaction payment gateway",
          payment,
        },
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "failed",
      error: "server error",
    });
  }
};

const MIDTRANS_CLIENT_KEY = process.env.MIDTRANS_CLIENT_KEY;
const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY;

const core = new midtransClient.CoreApi();

core.apiConfig.set({
  isProduction: false,
  serverKey: MIDTRANS_SERVER_KEY,
  clientKey: MIDTRANS_CLIENT_KEY,
});

/**
 * @param {string} status
 * @param {transactionId} transactionId
 */

exports.notification = async (req, res) => {
  try {
    const statusResponse = await core.transaction.notification(req.body);
    const orderId = statusResponse.order_id;
    const transactionStatus = statusResponse.transaction_status;
    const fraudStatus = statusResponse.fraud_status;

    if (transactionStatus == "capture") {
      if (fraudStatus == "challenge") {
        updateTransaction("pending", orderId);
        res.status(200);
      } else if (fraudStatus == "accept") {
        updateTransaction("success", orderId);
        res.status(200);
      }
    } else if (transactionStatus == "settlement") {
      updateTransaction("success", orderId);
      res.status(200);
    } else if (
      transactionStatus == "cancel" ||
      transactionStatus == "deny" ||
      transactionStatus == "expire"
    ) {
      updateTransaction("failed", orderId);
      res.status(200);
    } else if (transactionStatus == "pending") {
      updateTransaction("pending", orderId);
      res.status(200);
    }
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

const updateTransaction = async (status, transactionId) => {
  await transaction.update(
    {
      status,
    },
    {
      where: {
        id: transactionId,
      },
    }
  );
};
