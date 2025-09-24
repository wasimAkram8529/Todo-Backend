require("dotenv").config();
const express = require("express");
const router = require("./routes/tasks");
const morgan = require("morgan");
const cors = require("cors");
const connectDatabase = require("./db/connect");
const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");

const app = express();

app.use(express.static("./public"));
app.use(express.json());
app.use(morgan("tiny"));
app.use(cors(["http://localhost:3000/"]))
app.use("/api/v1/tasks", router);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT;
const start = async () => {
  try {
    await connectDatabase(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}....`);
    });
  } catch (error) {
    console.log("Database connect failed", error);
  }
};

start();
