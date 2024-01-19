const express = require("express");
const {
  createEvent,
  allEvents,
  UpdateEvent,
  QueryEvent,
} = require("../controller/eventController");
const router = express.Router();
const { authenticationMiddleware } = require("../middleware/authMiddleware");
const { adminBasedMiddleware } = require("../middleware/adminBasedMiddleware");

// route for creating an Event
router.post(
  "/create-event",
  authenticationMiddleware,
  adminBasedMiddleware,
  createEvent
);

router.get("/", allEvents);

router.post(
  "/update-event/:id",
  authenticationMiddleware,
  adminBasedMiddleware,
  UpdateEvent
);

router.get("/query-event", QueryEvent);

module.exports = router;
