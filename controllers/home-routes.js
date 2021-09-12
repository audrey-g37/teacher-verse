const router = require("express").Router();
const { Teacher, Assignment } = require("../models");
const bcrypt = require("bcrypt");

router.get("/", async (req, res) => {
  res.redirect("login");
});

router.get("/login", async (req, res) => {
  res.render("login");
});

// Current location  "http:localhost:3001/"

router.post("/login", async (req, res) => {
  try {
    const teacherData = await Teacher.findOne({
      where: { email: req.body.email },
    });

    if (!teacherData) {
      res.status(404).json("Login failed. Please try again!");
      return;
    }
    const validPassword = await bcrypt.compare(req.body.password, teacherData.password);
    if (!validPassword) {
      res.status(400).json("Login Failed");
      return;
    }
    req.session.loggedIn = true;
    res.redirect("/teacher");
  } catch (err) {
    res.status(500).json(err);
  }
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
    res.redirect("/login");
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
