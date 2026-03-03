const app = require('./app')
const connectDatabase = require("./db/connect");

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI
const start = async () => {
  try {
    await connectDatabase(MONGO_URI);
    console.log("Database connection stablised.")
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}....`);
    });
  } catch (error) {
    console.log("Database connect failed", error);
  }
};

start();
