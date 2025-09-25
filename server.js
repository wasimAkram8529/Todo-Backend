const app = require('./app')
const connectDatabase = require("./db/connect");

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
