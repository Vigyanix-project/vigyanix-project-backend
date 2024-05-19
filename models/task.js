const mongoose = require("mongoose");

const Task = mongoose.model("Task", {
  taskNumber: {
    type: String,
    required: true,
  },
  items: [{
    type: Object,
    required: true,
  }],
  confirmed: {
    type: Boolean,
    required: true,
    default: false,
  },
  finalNotes: {
    type: String
  },
  totalHours: {
    type: Number
  }
});

module.exports = Task;
