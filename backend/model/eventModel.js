const mongoose = require("mongoose");
const { Schema } = mongoose;

// Event schema to define how an event will look like as a document
const eventSchema = new Schema(
  {
    title: {
      required: true,
      type: String,
      trim: true,
    },
    branch: {
      type: String,
      require: true,
      trim: true,
    },
    responsibility: {
      required: true,
      type: String,
      trim: true,
    },

    event_date: {
      required: true,
      type: Date,
      trim: true,
    },

    event_description: {
      type: String,
      trim: true,
      default: null,
    },
    event_remark: {
      type: String,
      trim: true,
      default: null,
    },
    status: {
      required: true,
      type: String,
      enum: ["pending", "done", "postponed", "cancel"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const EventModel = mongoose.model("Event", eventSchema);

module.exports = { EventModel };
