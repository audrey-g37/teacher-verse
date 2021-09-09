const router = require("express").Router();

router.get("/", async (req, res) => {
  res.render("login");
});

router.get("/register", async (req, res) => {
  res.render("register");
});

module.exports = router;
