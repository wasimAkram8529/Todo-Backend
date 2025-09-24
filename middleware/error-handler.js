const { CustomAPIError } = require("../errors/custom-error");

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomAPIError)
    return res.status(err.status).json({ message: err.message });
  return res
    .status(400)
    .json({ message: "Something went wrong, please try again later.." });
};

module.exports = errorHandler;
