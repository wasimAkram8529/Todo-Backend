const {CustomAPIError} = require("../../errors/custom-error")
const errorHandler = require("../../middleware/error-handler")

describe("Suite for error handlers", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      params: {},
      body: {}
    }

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    next = jest.fn()
  })

  test("Test errorHandler function with error as instance of customAPIError", () => {
    const error = new CustomAPIError("Something went wrong", 400)

    errorHandler(error, req, res, next)
    
    expect(error).toBeInstanceOf(CustomAPIError)
    expect(res.status).toHaveBeenCalledWith(error.status)
    expect(res.json).toHaveBeenCalledWith({message: error.message})
  })

  test("Test errorHandler function with error not as instance of customAPIError", () => {
    const error = new Error("Something went wrong, please try again later..")

    errorHandler(error, req, res, next)
    
    expect(error).not.toBeInstanceOf(CustomAPIError)
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({message: "Something went wrong, please try again later.."})
  })
})