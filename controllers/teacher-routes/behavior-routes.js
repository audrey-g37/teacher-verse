const router = require("express").Router();
const { Student, Behavior, Communication } = require("../../models");

// Current location  "http:localhost:3001/teacher/behavior"

router.get("/", async (req, res) => {
  try {
    const behaviorData = await Behavior.findAll({
      include: [{ model: Communication }],
    });
    res.status(200).json(behaviorData);
  } catch (err) {
    res.render("404");
  }
});
router.get("/new-behavior", async (req, res) => {
  try {
    const dbStudentData = await Student.findAll({
      where: { teacherId: req.session.teacherId },
    });
    const studentData = dbStudentData.map((student) =>
      student.get({ plain: true })
    );
    if (studentData.length === 0) {
      res.render("no_students");
    } else {
      res.render("new_behavior", {
        studentData,
        loggedIn: req.session.loggedIn,
      });
    }
  } catch (err) {
    res.render("404");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const behaviorData = await Behavior.findByPk(req.params.id, {
      include: [{ model: Communication }],
    });
    if (!behaviorData) {
      res.status(404).json({
        message: `no behavior data found with id of ${req.params.id}`,
      });
    }
    res.status(200).json(behaviorData);
  } catch (err) {
    res.render("404");
  }
});

router.post("/new-behavior", async (req, res) => {
  try {
    console.log(req.body);
    const newBehavior = await Behavior.create(req.body);
    console.log("past the create");
    res.redirect("/teacher/student");
  } catch (err) {
    res.render("404");
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedBehavior = await Behavior.update(req.body, {
      where: { id: req.params.id },
    });
    if (!updatedBehavior[0]) {
      res.status(404).json({
        message: `no behavior data found with the id of ${req.params.id}`,
      });
    }
    res
      .status(200)
      .json({ message: `Behavior data with id of ${req.params.id} updated` });
  } catch (err) {
    res.render("404");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedBehavior = await Behavior.destroy({
      where: { id: req.params.id },
    });
    if (!deletedBehavior) {
      res
        .status(404)
        .json({ message: `no behavior data with id ${req.params.id} found` });
    }
    res
      .status(200)
      .json({ message: `Behavior datawith id ${req.params.id} deleted` });
  } catch (err) {
    res.render("404");
  }
});

//thunder client

module.exports = router;
