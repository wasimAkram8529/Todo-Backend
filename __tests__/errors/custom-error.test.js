const {CustomAPIError, customError} = require("../../errors/custom-error")

describe("CustomeAPIError", () => {
  test("Test CustomeAPIError class", () => {
    const error = new CustomAPIError("Something went wrong", 400)

    expect(error).toBeInstanceOf(Error)
    expect(error).toBeInstanceOf(CustomAPIError)
    expect(error.message).toBe("Something went wrong")
    expect(error.status).toBe(400)
  })

  test("Test customError function", () => {
    const error = customError("Unauthorised", 401)

    expect(error).toBeInstanceOf(CustomAPIError)
    expect(error.message).toBe("Unauthorised")
    expect(error.status).toBe(401)
  })
})