const router = require("express").Router();
const { Assignment } = require("../../models");

router.get("/new-assignment", async (req, res) => {
  try {
    res.render("new_assignment", { loggedIn: req.session.loggedIn });
  } catch (err) {
    res.render("404");
  }
});

router.post("/new-assignment", async (req, res) => {
  try {
    const newAssignment = await Assignment.create({
      title: req.body.title,
      description: req.body.description,
      dueDate: req.body.dueDate,
      assignedStatus: req.body.assignedStatus,
      teacherId: req.session.teacherId,
    });
    res.redirect("/teacher");
  } catch (err) {
    res.render("data_error");
  }
});

// Current location  "http:localhost:3001/teacher/assignment"

// router.get("/", async (req, res) => {
//   try {
//     const assignmentData = await Assignment.findAll({
//       where: { teacherId: req.session.teacherId },
//     });
//     res.status(200).json(assignmentData);
//   } catch (err) {
//     res.render("404");
//   }
// });

// router.get("/:id", async (req, res) => {
//   try {
//     const assignmentData = await Assignment.findByPk(req.params.id);
//     if (!assignmentData) {
//       res
//         .status(404)
//         .json({ message: `no assignment found with id of ${req.params.id}` });
//     }
//     res.status(200).json(assignmentData);
//   } catch (err) {
//     res.render("404");
//   }
// });

// router.put("/:id", async (req, res) => {
//   try {
//     const updatedAssignment = await Assignment.update(req.body, {
//       where: { id: req.params.id },
//     });
//     if (!updatedAssignment[0]) {
//       res.status(404).json({
//         message: `no assignment found with the id of ${req.params.id}`,
//       });
//     }
//     res
//       .status(200)
//       .json({ message: `assignment with id of ${req.params.id} updated` });
//   } catch (err) {
//     res.render("404");
//   }
// });

// router.delete("/:id", async (req, res) => {
//   try {
//     const deletedAssignment = await Assignment.destroy({
//       where: { id: req.params.id },
//     });
//     if (!deletedAssignment) {
//       res
//         .status(404)
//         .json({ message: `no assignment with id ${req.params.id} found` });
//     }
//     res
//       .status(200)
//       .json({ message: `assignment with id ${req.params.id} deleted` });
//   } catch (err) {
//     res.render("404");
//   }
// });

//thunder client

module.exports = router;
