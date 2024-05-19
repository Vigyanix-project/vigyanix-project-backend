const Task = require("../models/task");

const controller = {
  create: async (req, res) => {
    console.log("Controller > Task > Create");
    console.log("Req body", req.body);

    const foundTask = await Task.findOne({ taskNumber: req.body.taskNumber });

    if (foundTask === null) {
      const task = {
        taskNumber: req.body.taskNumber,
        items: req.body.items,
      };

      const newTask = await Task.create(task);
      newTask.save();

      return res
        .status(200)
        .json({ message: "Task created successfull!", task: newTask });
    }

    return res
      .status(404)
      .json({ message: "Task already exists", task: foundTask });
  },

  update: async (req, res) => {
    console.log("Controller > Task > Edit");
    console.log("Req body", req.body);

    const task = await Task.findOne({ taskNumber: req.body.taskNumber });

    if (task) {
      if (task.confirmed) {
        return res
         .status(400)
         .json({ message: "Task already confirmed" });
      }
      task.taskNumber = req.body.taskNumber;
      task.items = req.body.items;
      task.save();

      return res.status(200).json(task);
    }

    return res.status(404).json({
      message: "Task not found",
    });
  },

  confirm: async (req, res) => {
    console.log("Controller > Task > Confirm");
    console.log("Req body", req.body);

    const task = await Task.findOne({ taskNumber: req.body.taskNumber });

    if (task) {
      if (task.confirmed) {
        return res
         .status(400)
         .json({ message: "Task already confirmed" });
      }

      if (req.body.finalNotes === null || req.body.finalNotes === undefined) {
        return res
         .status(400)
         .json({ message: "Final notes are required" });
      }

      task.confirmed = true;
      task.finalNotes = req.body.finalNotes;
      task.totalHours = req.body.totalHours;
      task.save();

      return res.status(200).json(task);
    }

    return res.status(404).json({
      message: "Task not found",
    });
  },

  get: async (req, res) => {
    console.log("Controller > Task > Get");
    console.log("Req body", req.body);

    const task = await Task.findOne({ taskNumber: req.body.taskNumber });

    if (task) {
      return res.status(200).json(task);
    }

    return res.status(404).json({
      message: "Task not found",
    });
  },

  getAll: async (req, res) => {
    console.log("Controller > Task > Get All");
    console.log("Req body", req.body);

    const tasks = await Task.find();

    if (tasks) {
      return res.status(200).json(tasks);
    }

    return res.status(404).json({
      message: "Task not found",
    });
  },

  delete: async (req, res) => {
    console.log("Controller > Task > Delete");
    console.log("Req body", req.body);

    const task = await Task.findOne({ taskNumber: req.body.taskNumber });

    if (task) {
      task.remove();
      return res.status(200).json({ message: "Task deleted" });
    }

    return res.status(404).json({
      message: "Task not found",
    });
  },

  deleteAll: async (req, res) => {
    console.log("Controller > Task > Delete All");
    await Task.deleteMany();
    return res.json({ message: "All tasks deleted" });
  },
};

module.exports = controller;