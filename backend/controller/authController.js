const UserModel = require("../model/userModel");
const { CustomError } = require("../middleware/errorHandlerMiddleware");
const validator = require("validator");
const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");
const { encrypt, createJwtToken } = require("../utils/tools");
const SessionModel = require("../model/sessionModel");

const createUser = async (req, res) => {
  const { naf_number, password, name, rank, branch, role } = req.body;

  // validating incoming data before insertion
  if (validator.isEmpty(naf_number.trim())) {
    throw new CustomError(
      StatusCodes.BAD_REQUEST,
      "Please provide your NAF NUMBER"
    );
  }

  if (validator.isEmpty(name.trim())) {
    throw new CustomError(StatusCodes.BAD_REQUEST, "Please provide your name");
  }
  if (validator.isEmpty(rank.trim())) {
    throw new CustomError(
      StatusCodes.BAD_REQUEST,
      "Please provide a valid rank"
    );
  }
  if (validator.isEmpty(branch.trim())) {
    throw new CustomError(
      StatusCodes.BAD_REQUEST,
      "Please provide a valid Branch"
    );
  }
  // if (validator.isEmpty(role.trim())) {
  //   throw new CustomError(
  //     StatusCodes.BAD_REQUEST,
  //     "Please provide a valid role"
  //   );
  // }

  if (!validator.isStrongPassword(password)) {
    throw new CustomError(
      StatusCodes.BAD_REQUEST,
      "Please provide a strong password"
    );
  }

  //checking existing user
  const checkUserAlreadyExist = await UserModel.findOne({ naf_number });

  if (checkUserAlreadyExist) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: `A user with NAF number ${naf_number} already exist` });
  }

  const newUser = await UserModel.create({
    naf_number,
    password,
    name,
    rank,
    branch,
    role,
  });

  res.status(StatusCodes.CREATED).json({
    _id: newUser._id,
    naf_number: newUser.naf_number,
    name: newUser.name,
    rank: newUser.rank,
    branch: newUser.branch,
    role: newUser.role,
    password: newUser.password,
  });
};

//sign in existing user
const loginUser = async (req, res) => {
  //extract the neccesary values from the body
  const { naf_number, password } = req.body;

  if (validator.isEmpty(naf_number?.trim())) {
    throw new CustomError(400, "Invalid credentials");
  }

  if (!validator.isStrongPassword(password)) {
    throw new CustomError(400, "Invalid credentials");
  }

  //checking existing user
  const checkUserAlreadyExist = await UserModel.findOne({ naf_number });

  console.log(checkUserAlreadyExist);
  if (!checkUserAlreadyExist) {
    throw new CustomError(400, `Invalid credentials`);
  }
  const comparedPassword = await bcrypt.compare(
    password,
    checkUserAlreadyExist.password
  );
  if (!comparedPassword) {
    throw new CustomError(400, "Sorry invalid credentials");
  }

  /*extract the values to encrypt from the 
  user gotten from the database, exclude the password*/
  const user = { ...checkUserAlreadyExist._doc, password: undefined };

  // encrypt the user info using crpyto library
  const encryptedUserInfo = encrypt(JSON.stringify(user));

  // create a json web token
  const token = await createJwtToken(encryptedUserInfo);

  // establish a login session for the user
  await SessionModel.findOneAndUpdate(
    { userId: user._id },
    {
      remoteAddress: req.ip,
      userDevice: req.headers["user-agent"],
      token: token,
      userId: user._id,
    },
    {
      upsert: true,
    }
  );

  res.status(StatusCodes.OK).json({
    naf_number: user.naf_number,
    role: user.role,
    token,
  });
};

module.exports = {
  createUser,
  loginUser,
};
