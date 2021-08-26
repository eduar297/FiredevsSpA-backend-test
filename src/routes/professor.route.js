const { Router } = require("express"),
  router = Router(),
  {
    register,
    login,
    me,
    edit,
    deleteAccount,
    all,
  } = require("../controllers/professor.controller"),
  professorMiddleware = require("../middlewares/professor.middleware"),
  adminMiddleware = require("../middlewares/admin.middleware");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/edit").put(professorMiddleware, edit);
router.route("/me").get(professorMiddleware, me);
router.route("/delete").delete(professorMiddleware, deleteAccount);
router.route("/all").get(adminMiddleware, all);

module.exports = router;
