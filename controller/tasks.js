const { customError } = require("../errors/custom-error");
const asyncWrapper = require("../middleware/async");
const Task = require("../models/task");

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
});

const getTask = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;

  const task = await Task.findOne({ _id: id });

  if (!task) {
    return next(customError(`Task with id ${id} not found in database.`, 404));
  }
  res.status(200).json({ task });
});

const createTask = asyncWrapper(async (req, res) => {
  const task = Task.create(req.body);
  // const newTask = await task;
  res.status(201).json(task);
});

const updateTask = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const task = await Task.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return next(customError(`Task with id ${id} not found in database.`, 404));
  }
  res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const task = await Task.findOneAndDelete({ _id: id });
  if (!task) {
    return next(customError(`Task with id ${id} not found in database.`, 404));
  }
  res.status(200).json(task);
});

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
