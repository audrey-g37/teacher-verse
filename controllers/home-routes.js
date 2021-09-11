const router = require("express").Router();
const { Teacher } = require("../models");
const bcrypt = require("bcrypt");

router.get("/login", async (req, res) => {
  res.render("login");
});

// Current location  "http:localhost:3001/"

//TODO: figure out req.session.logged in

router.post("/login", async (req, res) => {
  try {
    const teacherData = await Teacher.findOne({
      where: { email: req.body.email },
    });

    if (!teacherData) {
      res.status(404).json({ message: "Login failed. Please try again!" });
      return;
    }
    console.log(req.body.password);
    const validPassword = await bcrypt.compare(
      req.body.password,
      teacherData.password
    );
    if (!validPassword) {
      res.status(400).json({ message: "Login failed. Please try again!" });
      return;
    }
    req.session.save(() => {
      req.session.loggedIn = true;
    });
    res.status(200).json("Login Successful");
    console.log(req.session);
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
    res.json("Register Successful!");
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
