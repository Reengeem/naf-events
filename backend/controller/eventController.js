const { EventModel } = require("../model/eventModel");
const { CustomError } = require("../middleware/errorHandlerMiddleware");
const validator = require("validator");
const { StatusCodes } = require("http-status-codes");

const createEvent = async (req, res) => {
  const {
    title,
    branch,
    responsibility,
    event_date,
    status,
    event_description,
  } = req.body;

  // validating input for creating a task
  if (validator.isEmpty(title.trim())) {
    throw new CustomError(
      StatusCodes.BAD_REQUEST,
      "Please provide the event TITLE"
    );
  }

  if (validator.isEmpty(branch.trim())) {
    throw new CustomError(
      StatusCodes.BAD_REQUEST,
      "Please provide the event Branch"
    );
  }

  if (validator.isEmpty(responsibility.trim())) {
    throw new CustomError(
      StatusCodes.BAD_REQUEST,
      "Please provide the event Responsility"
    );
  }

  if (validator.isEmpty(event_date.trim())) {
    throw new CustomError(
      StatusCodes.BAD_REQUEST,
      "Please provide date the event will hold"
    );
  }

  const newEvent = await EventModel.create({
    title,
    branch,
    responsibility,
    event_date,
    status,
    event_description,
  });

  res.status(StatusCodes.CREATED).json({
    _id: newEvent._id,
    title: newEvent.title,
    branch: newEvent.branch,
    responsibility: newEvent.responsibility,
    event_date: newEvent.event_date,
    status: newEvent.status,
  });
};

// Get fuunction to display all events.

const allEvents = async (req, res) => {
  const events = await EventModel.find({});

  res.status(StatusCodes.OK).json(events);
};

const UpdateEvent = async (req, res) => {
  try {
    const eventId = req.params.id; // Assuming you have a parameter named 'id' in the request params

    // Find the existing event by ID
    const existingEvent = await EventModel.findById(eventId);

    if (!existingEvent) {
      throw new CustomError(StatusCodes.NOT_FOUND, "Event not found");
    }

    const {
      title,
      branch,
      responsibility,
      event_date,
      status,
      event_description,
      event_remark,
    } = req.body;

    // Update the existing event properties with new data
    existingEvent.title = title || existingEvent.title;
    existingEvent.branch = branch || existingEvent.branch;
    existingEvent.responsibility =
      responsibility || existingEvent.responsibility;
    existingEvent.event_date = event_date || existingEvent.event_date;
    existingEvent.status = status || existingEvent.status;
    existingEvent.event_description =
      event_description || existingEvent.event_description;
    existingEvent.event_remark = event_remark || existingEvent.event_remark;

    // Save the updated event
    const updatedEvent = await existingEvent.save();
    // Send the updated event as a JSON response
    res.status(StatusCodes.OK).json({
      _id: updatedEvent._id,
      title: updatedEvent.title,
      branch: updatedEvent.branch,
      responsibility: updatedEvent.responsibility,
      event_date: updatedEvent.event_date,
      status: updatedEvent.status,
      event_description: updatedEvent.event_description,
    });
  } catch (error) {
    console.error("Error updating event:", error);

    if (error instanceof CustomError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: "Internal Server Error",
      });
    }
  }
};

const QueryEvent = async (req, res) => {
  const filterBySearch = req.query;

  const { quater } = req.query;
  let quaterDate = {};

  const currentYear = new Date().getFullYear();

  if (quater === "first-quater") {
    quaterDate = {
      startDate: new Date(`01/01/${currentYear}`),
      endDate: new Date(`03/31/${currentYear}`),
    };
  }
  if (quater === "second-quater") {
    quaterDate = {
      startDate: new Date(`04/01/${currentYear}`),
      endDate: new Date(`06/30/${currentYear}`),
    };
  }

  if (quater === "third-quater") {
    quaterDate = {
      startDate: new Date(`07/01/${currentYear}`),
      endDate: new Date(`09/30/${currentYear}`),
    };
  }

  if (quater === "fourth-quater") {
    quaterDate = {
      startDate: new Date(`10/01/${currentYear}`),
      endDate: new Date(`12/31/${currentYear}`),
    };
  }

  // find events based on quary provided
  const events = await EventModel.find({
    event_date: {
      $gte: quaterDate.startDate, // Specify your start date
      $lte: quaterDate.endDate, // Specify your end date
    },
  });

  res.status(200).json(events);
};
module.exports = { createEvent, allEvents, UpdateEvent, QueryEvent };
