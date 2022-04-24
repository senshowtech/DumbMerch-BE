const { category } = require("../../models");

exports.getAllCategory = async (req, res) => {
  try {
    const categories = await category.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "idUser"],
      },
    });
    return res.status(201).json({
      status: "succes",
      data: {
        categories,
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

exports.getDetailCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const categories = await category.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "idUser"],
      },
    });
    return res.status(201).json({
      status: "succes",
      data: {
        categories,
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

exports.addCategory = async (req, res) => {
  try {
    const categoryCreate = await category.create(req.body);
    return res.status(201).json({
      status: "success",
      data: {
        id: categoryCreate.id,
        name: categoryCreate.name,
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

exports.editCategory = async (req, res) => {
  try {
    const id = req.params.id;
    await category.update(req.body, {
      where: {
        id,
      },
    });
    const categories = await category.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "idUser"],
      },
    });
    return res.status(201).json({
      status: "succes",
      data: {
        categories,
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

exports.deleteCategory = async (req, res) => {
  try {
    const id = req.params.id;
    await category.destroy({
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
