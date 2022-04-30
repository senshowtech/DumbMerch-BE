const { product, user, productCategories, category } = require("../../models");
const fs = require("fs");

exports.getAllProduct = async (req, res) => {
  try {
    let products = await product.findAndCountAll({
      offset: (req.params.page - 1) * 8,
      limit: 8,
      include: [
        {
          model: user,
          as: "users",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        },
        {
          model: category,
          as: "categories",
          through: {
            model: productCategories,
            as: "bridge",
            attributes: [],
          },
          attributes: {
            exclude: ["createdAt", "updatedAt"],
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
        products: products.rows,
        total_data: products.count,
        total_page: Math.ceil(products.count / 8),
        current_page: parseInt(req.params.page),
        last_page: Math.ceil(products.count / 8),
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
        {
          model: category,
          as: "categories",
          through: {
            model: productCategories,
            as: "bridge",
            attributes: [],
          },
          attributes: {
            exclude: ["createdAt", "updatedAt"],
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
    if (req.body.category === "[]") {
      return res.status(400).send({
        status: "failed",
        message: "Category harus di isi",
      });
    }

    let productCreate = await product.create({
      ...req.body,
      kurir: JSON.parse(req.body.kurir),
      image: process.env.url + req.file.filename,
      idUser: req.user.id,
    });

    let data_category = JSON.parse(req.body.category);

    let productCategoryData = data_category.map((item) => {
      return { idProduct: productCreate.id, idCategory: parseInt(item) };
    });
    await productCategories.bulkCreate(productCategoryData);

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
        {
          model: category,
          as: "categories",
          through: {
            model: productCategories,
            as: "bridge",
            attributes: [],
          },
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "idUser"],
      },
    });

    let prev_categories_data = products.id;

    productCategories.destroy({
      where: {
        idProduct: prev_categories_data,
      },
    });

    let data_category = JSON.parse(req.body.category);
    let productCategoryData = data_category.map((item) => {
      return { idProduct: products.id, idCategory: parseInt(item) };
    });
    await productCategories.bulkCreate(productCategoryData);

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
