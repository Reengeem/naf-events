const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema(
  {
    remoteAddress: {
      type: String,
      required: true,
    },
    userDevice: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      unique: true,
    },
  },

  {
    timestamps: true,
  }
);

const SessionModel = mongoose.model("Session", sessionSchema);

module.exports = SessionModel;
