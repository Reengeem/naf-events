const { CustomError } = require("./errorHandlerMiddleware");
const { StatusCodes } = require("http-status-codes");

const adminBasedMiddleware = async (req, res, next) => {
  console.log(req.user);

  if (req.user.role !== "super-admin") {
    throw new CustomError(StatusCodes.UNAUTHORIZED, "Access denied");
  }

  next();
};

module.exports = { adminBasedMiddleware };
