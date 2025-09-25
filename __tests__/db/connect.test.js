const {MongoMemoryServer} = require("mongodb-memory-server");
const mongoose = require('mongoose');
const connectDatabase = require("../../db/connect")

describe("Test suit to check mongoose connect", () => {
  let mongoServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    const URI = mongoServer.getUri()
    await connectDatabase(URI)
  })

  afterAll(async () => {
    await mongoose.disconnect()
    await mongoServer.stop()
  })

  test("Mongoose should be connected", async () => {
    expect(mongoose.connection.readyState).toBe(1)
  })
})