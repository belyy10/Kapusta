const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const authRouter = require("./routes/api/auth-routes");
const transactionRouter = require("./routes/api/transactions");
const googleRouter = require("./routes/api/gooogle-routes");

const app = express();

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/auth", googleRouter);
app.use("/api/users", authRouter);
app.use("/api/transaction", transactionRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((error, req, res, next) => {
  console.error("Handling errors: ", error.message, error.name);

  if (error.name === "ValidationError") {
    return res.status(400).json({
      message: error.message,
    });
  }

  if (error.message.includes("Cast to ObjectId failed for value")) {
    return res.status(400).json({
      message: "id is invalid",
    });
  }

  if (error.status) {
    return res.status(error.status).json({
      message: error.message,
    });
  }

  return res.status(500).json({
    message: "Internal server error",
  });
});

module.exports = app;
