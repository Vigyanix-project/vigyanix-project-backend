const router = require("express").Router();
const taskCont = require("../controllers/task");
const taskMid = require("../middlewares/task");

router
  .route("/create")
  .post(taskMid.validate, taskCont.create);

router
  .route("/update")
  .put(taskMid.validate, taskCont.update);

router
  .route("/confirm")
  .put(taskMid.validate, taskCont.confirm);

router
  .route("/delete")
  .delete(taskMid.validate, taskCont.delete);

router
  .route("/get")
  .get(taskMid.validate, taskCont.get);

router
  .route("/get-all")
  .get(taskCont.getAll);

router
  .route("/delete-all")
  .delete(taskCont.deleteAll);


module.exports = router;