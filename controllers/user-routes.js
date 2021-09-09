const router = require("express").Router();
const {
  Teacher,
  Attendance,
  Behavior,
  Student,
  Guardian,
  Communication,
  Assignment,
  AssignmentFeedback,
} = require("../models");

router.get("/", async (req, res) => {
  try {
    const dbAssignmentData = await Assignment.findAll({
      attributes: ["title"],
    });

    const assignmentData = dbAssignmentData.map((assignment) => assignment.get({ plain: true }));
    res.render("homepage", { assignmentData });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/roster", async (req, res) => {
  //meta data comes in from req.body
  //create a student, need teachID also from request
  const student = await student.create(req.body);
  res.json("ok");
});

module.exports = router;
