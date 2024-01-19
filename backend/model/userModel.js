const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// user schema to define how a user is going to look like
const userSchema = new mongoose.Schema(
  {
    naf_number: {
      required: true,
      type: String,
      trim: true,
      unique: true,
    },
    name: {
      required: true,
      type: String,
      trim: true,
    },
    rank: {
      required: true,
      type: String,
      trim: true,
    },
    password: {
      required: true,
      type: String,
      trim: true,
    },

    branch: {
      required: true,
      type: String,
      trim: true,
    },

    role: {
      type: String,
      trim: true,
      enum: {
        values: ["branch-admin", "super-admin"],
        message: "emum validator failed for path `{PATH}` with value `{VALUE}`",
      },
      default: "branch-admin",
    },
  },
  { timestamps: true }
);

// hash the user password before save to database
userSchema.pre("save", async function () {
  // if password is not modified return
  if (!this.isModified("password")) return;
  // else hash password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password, salt);

  this.password = hash;
});

// user model creation
const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
