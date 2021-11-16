const router = require("express").Router();
const { Teacher, Assignment } = require("../models");
const bcrypt = require("bcrypt");
const moment = require("moment");

router.get("/", async (req, res) => {
  res.redirect("login");
});

router.get("/login", async (req, res) => {
  if (req.session.loggedIn === true) {
    res.redirect("/teacher");
  } else res.render("login");
});

router.post("/login", async (req, res) => {
  try {
    const teacherData = await Teacher.findOne({
      where: { email: req.body.email },
    });

    if (!teacherData) {
      res.render("data_error");
      return;
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      teacherData.password
    );
    if (!validPassword) {
      res.render("data_error");
      return;
    }
    const idToStore = JSON.stringify(teacherData.dataValues.id);

    req.session.teacherId = idToStore;
    req.session.loggedIn = true;
    req.session.date = moment().format("MM-DD-YYYY");
    req.session.newFun = true;
    // console.log(req.session);
    res.redirect("/teacher");
  } catch (err) {
    res.render("404");
  }
});

router.get("/register", async (req, res) => {
  try {
    res.render("register");
  } catch (err) {
    res.render("404");
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
    res.render("data_error");
  }
});

module.exports = router;
