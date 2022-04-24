const { cart, user, product } = require("../../models");

exports.addCart = async (req, res) => {
  try {
    await cart.create(req.body);
    return res.status(201).json({
      status: "succes",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
    });
  }
};

exports.getCart = async (req, res) => {
  try {
    const carts = await user.findOne({
      where: {
        id: req.user.id,
      },
      include: [
        {
          model: product,
          as: "productsCart",
          through: {
            model: cart,
            as: "bridge",
            attributes: [],
          },
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "status", "password", "email"],
      },
    });
    return res.status(201).json({
      status: "succes",
      data: carts,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
    });
  }
};

exports.deleteCart = async (req, res) => {
  try {
    const id = req.params.id;
    const findCartsProduct = await cart.findOne({
      where: {
        idProduct: id,
      },
      attributes: ["id"],
    });
    if (findCartsProduct.id != null) {
      await cart.destroy({
        where: {
          id: findCartsProduct.id,
        },
      });
    }
    return res.status(201).json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
    });
  }
};
