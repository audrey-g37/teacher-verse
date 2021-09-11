const router = require("express").Router();
const teacherRoutes = require("./teacher-routes");
const apiData = require("./api");


router.use("/api", apiData);
router.use("/teacher", teacherRoutes);
router.use("/", teacherRoutes);
router.use((req, res) => {
  res.status(403).json({ message: "You dont have access to this page" }); //connecting to handlebars "Catherine"
});

module.exports = router;
