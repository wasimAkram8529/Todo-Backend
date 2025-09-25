const mongoose = require("mongoose")
const { MongoMemoryServer } = require("mongodb-memory-server")
const request = require('supertest')
const connectDatabase = require("../db/connect")
const Todo = require("../models/task")
const app = require("../app");

describe("Integration test suits", () => {
  let mongoServer;

  beforeAll(async() => {
    mongoServer = await MongoMemoryServer.create()
    const uri = mongoServer.getUri()
    await mongoose.disconnect()
    await connectDatabase(uri)
  })

  afterAll(async() => {
    await mongoose.disconnect()
    await mongoServer.stop()
  })

  beforeEach(async() => {
    await Todo.deleteMany();
  })

  test("Get api/vi/tasks test", async() => {
    await Todo.create({name: "Gym"})
    const response = await request(app).get('/api/v1/tasks')

    expect(response.status).toBe(200)
    expect(response.body.tasks).toHaveLength(1)
    expect(response.body.tasks[0].name).toBe("Gym")
  })

  test("Post api/vi/tasks test", async() => {
    const response = await request(app).post('/api/v1/tasks').send({name: "Gym"})

    // console.log(response.body)
    expect(response.status).toBe(201)
    expect(response.body.name).toBe("Gym")
  })

  test("Get api/vi/tasks/:id test", async() => {
    await Todo.create({name: "Gym"})
    const task = await Todo.create({name: "Read Book"})
    const {_id} = task;
    const response = await request(app).get(`/api/v1/tasks/${_id}`)

    // console.log(response.body)
    expect(response.status).toBe(200)
    expect(response.body.task.name).toBe("Read Book")
  })

  test("Patch api/vi/tasks/:id test", async() => {
    await Todo.create({name: "Gym"})
    const task = await Todo.create({name: "Read Book"})
    const {_id} = task;
    const response = await request(app).patch(`/api/v1/tasks/${_id}`).send({name: "Read comics"})

    // console.log(response.body)
    expect(response.status).toBe(200)
    expect(response.body.task.name).toBe("Read comics")
  })

  test("Delete api/vi/tasks/:id test", async() => {
    await Todo.create({name: "Gym"})
    const task = await Todo.create({name: "Read Book"})
    const {_id} = task;
    const response = await request(app).delete(`/api/v1/tasks/${_id}`)

    // console.log(response.body)
    expect(response.status).toBe(200)
    expect(response.body.name).toBe("Read Book")
  })
})
