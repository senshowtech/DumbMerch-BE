const { profile } = require("../../models");
const cloudinary = require("../utils/cloudinary");

exports.addProfile = async (req, res) => {
  try {
    await profile.create(req.body);
    const profiles = await profile.findAll();
    return res.status(201).json({
      status: "success",
      profiles,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "failed",
      error: "server error",
    });
  }
};

exports.editProfile = async (req, res) => {
  try {
    const id = req.user.id;
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "dumbmerch",
      use_filename: true,
      unique_filename: false,
    });
    await profile.update(
      {
        ...req.body,
        image: result.url,
      },
      {
        where: {
          id,
        },
      }
    );
    const profiles = await profile.findOne({
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
        profiles,
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
