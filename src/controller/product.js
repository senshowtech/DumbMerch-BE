const { product, user } = require("../../models");
const fs = require("fs");

exports.getAllProduct = async (req, res) => {
  try {
    let products = await product.findAndCountAll({
      offset: req.params.page * 8,
      limit: 8,
      include: [
        {
          model: user,
          as: "users",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "idUser"],
      },
    });
    return res.status(201).json({
      status: "succes",
      data: {
        products,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
      error: "server error",
    });
  }
};

exports.getDetailProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const products = await product.findOne({
      where: {
        id,
      },
      include: [
        {
          model: user,
          as: "users",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "idUser"],
      },
    });
    return res.status(201).json({
      status: "succes",
      data: {
        products,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
      error: "server error",
    });
  }
};

exports.addProducts = async (req, res) => {
  try {
    let productCreate = await product.create({
      ...req.body,
      kurir: JSON.parse(req.body.kurir),
      image: process.env.url + req.file.filename,
      idUser: req.user.id,
    });
    const users = await user.findOne({
      where: {
        id: productCreate.idUser,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "idUser"],
      },
    });
    return res.status(201).json({
      status: "success",
      data: {
        id: productCreate.id,
        title: productCreate.title,
        image: productCreate.image,
        desc: productCreate.desc,
        price: productCreate.price,
        image: process.env.url + req.file.filename,
        qty: productCreate.qty,
        users,
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

exports.editProducts = async (req, res) => {
  try {
    const id = req.params.id;
    const products = await product.findOne({
      where: {
        id,
      },
      include: [
        {
          model: user,
          as: "users",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "idUser"],
      },
    });
    let replaceImage = products.image.replace(process.env.url, "");
    fs.unlink(`./uploads/${replaceImage}`, (error) => {
      if (error) {
        throw error;
      }
    });
    await product.update(
      {
        ...req.body,
        image: process.env.url + req.file.filename,
        kurir: JSON.parse(req.body.kurir),
        idUser: req.user.id,
      },
      {
        where: {
          id,
        },
      }
    );
    return res.status(201).json({
      status: "succes",
      data: {
        products,
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

exports.deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    let productImage = await product.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: [
          "createdAt",
          "updatedAt",
          "idUser",
          "title",
          "desc",
          "price",
          "qty",
          "id",
          "kurir",
        ],
      },
    });
    let replaceImage = productImage.image.replace(process.env.url, "");
    fs.unlink(`./uploads/${replaceImage}`, (error) => {
      if (error) {
        throw error;
      }
    });
    await product.destroy({
      where: {
        id: id,
      },
    });
    return res.status(201).json({
      status: "succes",
      data: {
        id: id,
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
