const router = require("express").Router();
const apiRoutes = require("./api");
const loginPage = require("./home-routes");
const teacherView = require("./user-routes");

router.use("/api", apiRoutes);
router.use("/", loginPage);
router.use("/register", loginPage);
router.use("/teacher", teacherView);
router.use((req, res) => {
  res.status(403).json({ message: "You dont have access to this page" }); //connecting to handlebars "Catherine"
});

module.exports = router;
