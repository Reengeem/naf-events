require("dotenv").config();
require("express-async-errors");

const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

// custom middleware
const { routeNotFoundMiddleware } = require("./middleware/routeNotFound");
const {
  errorHandlerMiddleware,
} = require("./middleware/errorHandlerMiddleware");

// connect to database func
const { connectDB } = require("./config/dbConnect");

// routes imports
const authRoutes = require("./route/authRoute");
const eventRoutes = require("./route/eventRoute");
// middlewares

const allowedOrigins = [
  "https://naf-events.vercel.app",
  "http://localhost:5173",
];
// middleware
app.use(function (req, res, next) {
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type, authorization"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use(express.json());
// Middleware to parse urlencoded form data
app.use(express.urlencoded({ extended: true }));

// routes usage
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/event", eventRoutes);

app.use(routeNotFoundMiddleware);
app.use(errorHandlerMiddleware);

const startApp = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => console.log(`Server starting on ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

startApp();
