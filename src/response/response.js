exports.response = (object, res, status) => {
  if (object.status === "error") {
    return res.status(status).json(object);
  } else {
    return res.status(status).json(object);
  }
};
