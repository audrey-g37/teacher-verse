const router = require("express").Router();
const { Teacher, Assignment } = require("../models");
const bcrypt = require("bcrypt");

router.get("/", async (req, res) => {
  res.redirect("login");
});

router.get("/login", async (req, res) => {
  res.render("login");
});

router.post("/login", async (req, res) => {
  try {
    const teacherData = await Teacher.findOne({
      where: { email: req.body.email },
    });

    if (!teacherData) {
      res.render("404");
      return;
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      teacherData.password
    );
    if (!validPassword) {
      res.status(400).json("Login Failed");
      return;
    }
    const idToStore = JSON.stringify(teacherData.dataValues.id);

    req.session.teacherId = idToStore;
    req.session.loggedIn = true;

    console.log(req.session);
    res.redirect("/teacher");
  } catch (err) {
    res.render("404");
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
