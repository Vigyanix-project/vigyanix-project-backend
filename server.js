// If we are not in production then use .env file
process.env.NODE_ENV !== "production" && require("dotenv").config();

const express = require("express");
const app = express();
const morgan = require("morgan");
const corsOptions = require("./utils/cors");
const connectDB = require("./utils/database");
const cors = require("cors");
const routes = require("./routes");
const PORT = process.env.PORT || 1337;

// Database connection
connectDB();

// Middleswares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use("/vigyanix/api", routes);

// Genric routes handler
app.get("*", (req, res) => {
  return res.status(404).json({
    message: "Invalid URL",
  });
});

// Start Server
app.listen(PORT, () => console.log("Server running on " + PORT));