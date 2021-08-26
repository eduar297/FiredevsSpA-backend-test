const { Router } = require("express"),
  router = Router(),
  {
    create,
    get,
    edit,
    deleteGroup,
    all,
  } = require("../controllers/group.controller"),
  adminMiddleware = require("../middlewares/admin.middleware");

router.route("/create").post(adminMiddleware, create);
router.route("/get/:id").get(get);
router.route("/edit/:id").put(adminMiddleware, edit);
router.route("/delete/:id").delete(adminMiddleware, deleteGroup);
router.route("/all").get(all);

module.exports = router;
