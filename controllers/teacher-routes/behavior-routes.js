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
    res.status(500).json(err);
  }
});
router.get("/new-behavior", async (req, res) => {
  try {
    const dbStudentData = await Student.findAll({
      attributes: ["id", "firstName", "lastName"],
    });
    const studentData = dbStudentData.map((student) =>
      student.get({ plain: true })
    );
    res.render("new_behavior", { studentData, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
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
    res.status(500).json(err);
  }
});

router.post("/new-behavior", async (req, res) => {
  try {
    const newBehavior = await Behavior.create({
      title: req.body.title,
      description: req.body.description,
      immediateActionTaken: req.body.immediateActionTaken,
      postActionComments: req.body.postActionComments,
      isGood: req.body.isGood,
      communicationId: req.body.communicationId,
      studentId: req.body.studentId,
    });
    res.redirect("/teacher", {
      assignmentData,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(400).json(err);
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
    res.status(500).json(err);
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
    res.status(500).json(err);
  }
});

//thunder client

module.exports = router;
