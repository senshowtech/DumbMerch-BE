const { user, profile } = require("../../models");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.Register = async (req, res) => {
  try {
    const schema = Joi.object({
      name: Joi.string().min(3).required(),
      email: Joi.string().email().min(5).required(),
      password: Joi.string().min(6).required(),
      status: Joi.string(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      let path = error.details[0].path;
      let errors = "";
      if (String(path) === "email") {
        errors = "email tidak boleh kosong dan minimal 5 karakter";
      } else if (String(path) === "name") {
        errors = "nama tidak boleh kosong dan minimal 3 karakter";
      } else if (String(path) === "password") {
        errors = "password minimal 6 karakter";
      }
      return res.status(400).json({
        error: {
          message: errors,
        },
      });
    }

    const usersCheck = await user.findOne({
      where: {
        email: req.body.email,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "idUser"],
      },
    });

    if (usersCheck != null) {
      return res.status(500).json({
        status: "failed",
        message: "Email sudah di gunakan",
      });
    }

    const { name, email, password, status } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await user.create({
      name: name,
      email: email,
      status: status,
      password: hashedPassword,
    });

    await profile.create({ idUser: newUser.id });

    const token = jwt.sign({ id: newUser.id }, process.env.Token);

    return res.status(201).json({
      status: "success",
      data: {
        user: {
          name: newUser.name,
          email: newUser.email,
          token: token,
        },
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

exports.Login = async (req, res) => {
  try {
    const schema = Joi.object({
      email: Joi.string().email().min(5).required(),
      password: Joi.string().min(6).required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      let path = error.details[0].path;
      let errors = "";
      if (String(path) === "email") {
        errors = "email tidak boleh kosong dan minimal 5 karakter";
      } else if (String(path) === "password") {
        errors = "password minimal 6 karakter";
      }
      return res.status(400).json({
        error: {
          message: errors,
        },
      });
    }

    const usersCheck = await user.findOne({
      where: {
        email: req.body.email,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    if (usersCheck === null) {
      return res.status(400).send({
        status: "failed",
        message: "Email atau password tidak sama",
      });
    }

    const checkPassword = await bcrypt.compare(
      req.body.password,
      usersCheck.password
    );

    if (checkPassword === false) {
      return res.status(400).send({
        status: "failed",
        message: "Email or password not match",
      });
    }

    const token = jwt.sign({ id: usersCheck.id }, process.env.Token);

    return res.status(201).json({
      status: "success",
      data: {
        user: {
          name: usersCheck.name,
          email: usersCheck.email,
          status: usersCheck.status,
          token: token,
        },
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

exports.getUser = async (req, res) => {
  try {
    let users = await user.findOne({
      where: {
        id: req.user.id,
      },
      include: [
        {
          model: profile,
          as: "profiles",
          attributes: {
            exclude: ["createdAt", "updatedAt", "idUser"],
          },
        },
      ],
    });
    return res.status(201).json({
      status: "success",
      data: {
        users,
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
