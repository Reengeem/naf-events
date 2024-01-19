const jwt = require("jsonwebtoken");
const { decrypt } = require("../utils/tools");
const { CustomError } = require("./errorHandlerMiddleware");
const { StatusCodes } = require("http-status-codes");
const SessionModel = require("../model/sessionModel");

// authenticate user login session

const authenticationMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  //   step one check if token is provided
  if (!token) {
    throw new CustomError(StatusCodes.UNAUTHORIZED, "Not authorized");
  }
  //   step two verify jwt token
  const verifyToken = await jwt.verify(token, process.env.JWT_ENCRYPTION_KEY);
  //   step three decrypt the user value
  const decryptedUser = await decrypt({
    iv: verifyToken.iv,
    encryptedData: verifyToken.encryptedData,
  });

  const decryptedUserInfo = JSON.parse(decryptedUser);

  //   check user login session to verify the session deatils are still correct
  const userSession = await SessionModel.findOne({
    userId: decryptedUserInfo._id,
  });

  // check if user ip address and device is the same as when the login session was created
  if (
    req.ip !== userSession.remoteAddress ||
    req.headers["user-agent"] !== userSession.userDevice
  ) {
    throw new CustomError(StatusCodes.UNAUTHORIZED, "Not authorized");
  }

  //   check if the token are correct
  if (token !== userSession.token) {
    throw new CustomError(StatusCodes.UNAUTHORIZED, "Not authorized");
  }

  /*   if everything is correct then move on to the next function 
        and create a new user property on the req object
        before it gets the next function */

  /* this req.user object will the accessable in the next func that comes after this
            so just do "req.user" in the next fuction to access it */

  req.user = decryptedUserInfo;
  next();
};

module.exports = { authenticationMiddleware };
