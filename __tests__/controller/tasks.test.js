const Task = require("../../models/task")
const {getAllTasks, getTask, createTask, updateTask, deleteTask} = require("../../controller/tasks");


jest.mock('../../models/task')


describe("Task controller unit test", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      body: {},
      params: {}
    }
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }
    next = jest.fn()
  })

  test("Test getAllTasks function Passed", async () => {
    const mockTodos = [{name: "Gym"}, {name: "Read book"}]
    Task.find.mockResolvedValue(mockTodos)

    await getAllTasks(req, res, next)

    expect(Task.find).toHaveBeenCalledTimes(1)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({tasks:mockTodos})
  })

  test("Test getAllTasks function failed", async () => {
    const error = new Error("DB Error");
    Task.find.mockRejectedValue(error)

    await getAllTasks(req, res, next)

    expect(next).toHaveBeenCalledTimes(1)
    expect(next).toHaveBeenCalledWith(error)
  })
  
  test("Test getTask function Passed with valid id", async () => {
    const mockTodos = {name: "Gym", id: 1}
    Task.findOne.mockResolvedValue(mockTodos)

    req.params = {id: 1}

    await getTask(req, res, next)

    expect(Task.findOne).toHaveBeenCalledTimes(1)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({task:mockTodos})
  })

  test("Test getTask function Passed with invalid id", async () => {
    const error = new Error("Task with given id not found in database.")
    Task.findOne.mockRejectedValue(error)

    req.params = {id: 2}

    await getTask(req, res, next)

    expect(next).toHaveBeenCalledWith(error)
  })

  test("Test createTask function Passed with valid req.body", async () => {
    const mockBody = {name: "Gym"}
    const mockTodos = {name: "Gym", id: 1, completed: false}
    req.body = mockBody; 
    
    Task.create.mockResolvedValue(mockTodos)

    await createTask(req, res, next)

    expect(Task.create).toHaveBeenCalledTimes(1)
    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.json).toHaveBeenCalledWith(mockTodos)
  })

  test("Test updateTask function Passed with valid id", async () => {
    req.params = {id : 1}
    req.body = {
      name: "Read Book"
    }

    const mockTodoResponse = {id: 1, name: "Read Book", completed: false}

    Task.findOneAndUpdate.mockResolvedValue(mockTodoResponse)

    await updateTask(req, res, next)

    expect(Task.findOneAndUpdate).toHaveBeenCalledTimes(1)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({task: mockTodoResponse})
  })

  test("Test updateTask function Passed with invalid id", async () => {
    req.params = {id : 1}
    req.body = {
      name: "Read Book"
    }

    const error = new Error("Task with given id not found in database.")

    Task.findOneAndUpdate.mockRejectedValue(error)

    await updateTask(req, res, next)

    expect(next).toHaveBeenCalledTimes(1)
    expect(next).toHaveBeenCalledWith(error)
  })

  test("Test deleteTask function Passed with valid id", async () => {
    req.params = {id : 1}

    const mockTodoResponse = {id: 1, name: "Read Book", completed: false}

    Task.findOneAndDelete.mockResolvedValue(mockTodoResponse)

    await deleteTask(req, res, next)

    expect(Task.findOneAndDelete).toHaveBeenCalledTimes(1)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith(mockTodoResponse)
  })

  test("Test deleteTask function Passed with invalid id", async () => {
    req.params = {id : 1}

    const error = new Error("Task with given id not found in database.")

    Task.findOneAndDelete.mockRejectedValue(error)

    await deleteTask(req, res, next)

    expect(next).toHaveBeenCalledTimes(1)
    expect(next).toHaveBeenCalledWith(error)
  })
})