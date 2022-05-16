const { todo } = require("../../models");

exports.getTodo = async (req, res) => {
  try {
    let todoapp = await todo.findAll();
    return res.status(201).json({
      status: "succes",
      data: {
        todo: todoapp,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "failed",
    });
  }
};

exports.addTodo = async (req, res) => {
  try {
    let todoCreate = await todo.create(req.body);
    return res.status(201).json({
      status: "succes",
      data: {
        todo: todoCreate,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "failed",
    });
  }
};

exports.getDetailTodo = async (req, res) => {
  try {
    const id = req.params.id;
    const todos = await todo.findOne({
      where: {
        id,
      },
    });
    return res.status(201).json({
      status: "succes",
      data: {
        todos,
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

exports.editTodo = async (req, res) => {
  try {
    const id = req.params.id;
    await todo.update(req.body, {
      where: {
        id,
      },
    });
    const todos = await todo.findOne({
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
        todos,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "failed",
    });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const id = req.params.id;
    await todo.destroy({
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
