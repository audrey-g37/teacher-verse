const router = require("express").Router();
const { Teacher } = require("../models");

router.get("/login", async (req, res) => {
  res.render("login");
});

router.get("/register", async (req, res) => {
  try {
    res.render("register");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/register", async (req, res) => {
  try {
    const newTeacher = await Teacher.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    });
    res.json("Register Successful!");
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
