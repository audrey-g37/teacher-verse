const router = require("express").Router();
const { Assignment, AssignmentFeedback } = require("../../models");

// Current location  "http:localhost:3001/api/assignmentFeedback"

router.get("/", async (req, res) => {
  try {
    const assignmentFeedbackData = await AssignmentFeedback.findAll({
      include: [{ model: Assignment }],
    });
    res.status(200).json(assignmentFeedbackData);
  } catch (err) {
    res.render("404");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const assignmentFeedbackData = await AssignmentFeedback.findByPk(
      req.params.id,
      { include: [{ model: Assignment }] }
    );
    if (!assignmentFeedbackData) {
      res
        .status(404)
        .json({ message: `no assignment found with id of ${req.params.id}` });
    }
    res.status(200).json(assignmentFeedbackData);
  } catch (err) {
    res.render("404");
  }
});

router.post("/", async (req, res) => {
  try {
    const newAssignmentFeedback = await AssignmentFeedback.create({
      feedback: req.body.feedback,
      submissionStatus: req.body.submissionStatus,
      scoreEarned: req.body.scoreEarned,
      assignmentId: req.body.assignmentId,
    });
    res.status(200).json({ message: "Assignment Feedback Created!" });
  } catch (err) {
    res.render("404");
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedAssignmentFeedback = await AssignmentFeedback.update(
      req.body,
      { where: { id: req.params.id } }
    );
    if (!updatedAssignmentFeedback[0]) {
      res
        .status(404)
        .json({
          message: `no assignment feedback found with the id of ${req.params.id}`,
        });
    }
    res
      .status(200)
      .json({
        message: `assignment feedback with id of ${req.params.id} updated`,
      });
  } catch (err) {
    res.render("404");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedAssignmentFeedback = await AssignmentFeedback.destroy({
      where: { id: req.params.id },
    });
    if (!deletedAssignmentFeedback) {
      res
        .status(404)
        .json({
          message: `no assignment feedback with id ${req.params.id} found`,
        });
    }
    res
      .status(200)
      .json({
        message: `assignment feedback with id ${req.params.id} deleted`,
      });
  } catch (err) {
    res.render("404");
  }
});

//thunder client

module.exports = router;
