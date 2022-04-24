const { transaction, product, user } = require("../../models");

exports.AddTransaction = async (req, res) => {
  try {
    const transactionCreate = await transaction.create({
      ...req.body,
      idBuyer: req.user.id,
      status: "pending",
    });
    return res.status(201).json({
      status: "succes",
      data: {
        id: transactionCreate.id,
        idProduct: transactionCreate.idProduct,
        idBuyer: req.user.id,
        idSeller: transactionCreate.idSeller,
        price: transactionCreate.price,
        status: "pending",
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

exports.getAllTransaction = async (req, res) => {
  try {
    const dataTransaction = await transaction.findAll({
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
        exclude: ["createdAt", "updatedAt"],
      },
    });
    let transactions = [];
    dataTransaction.forEach((value) => {
      let data = {
        id: value.id,
        product: value.product,
        buyer: value.buyer,
        seller: value.seller,
        price: value.price,
        status: value.status,
      };
      transactions.push(data);
    });
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
