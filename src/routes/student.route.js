const { Router } = require("express"),
  router = Router(),
  {
    register,
    login,
    me,
    edit,
    deleteAccount,
    all,
  } = require("../controllers/student.controller"),
  studentMiddleware = require("../middlewares/student.middleware");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/edit").put(studentMiddleware, edit);
router.route("/me").get(studentMiddleware, me);
router.route("/delete").delete(studentMiddleware, deleteAccount);
router.route("/all").get(all);

module.exports = router;
