const { Router } = require("express"),
  router = Router(),
  { create, get } = require("../controllers/group.controller"),
  adminMiddleware = require("../middlewares/admin.middleware");

router.route("/create").post(adminMiddleware, create);
router.route("/get/:id").get(adminMiddleware, get);

module.exports = router;
