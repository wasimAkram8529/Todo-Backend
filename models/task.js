const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name must be provided"],
    trim: true,
    maxLength: [25, "Name can not be more than 25 character"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

// taskSchema.pre("save", function (next) {
//   console.log(this);
//   next();
// });

// taskSchema.post("save", function (next) {
//   console.log(this);
//   next();
// });

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
