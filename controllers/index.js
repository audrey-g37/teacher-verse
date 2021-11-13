const router = require("express").Router();
const teacherRoutes = require("./teacher-routes");
const homeRoutes = require("./login_register-routes");

// const apiData = require("./api");
// router.use("/api", apiData);

router.use("/teacher", teacherRoutes);
router.use("/", homeRoutes);
router.use((req, res) => {
  res.status(403).json("You dont have access to this page");
});

module.exports = router;
