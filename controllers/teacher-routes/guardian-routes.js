const router = require("express").Router();
const { Guardian, Student } = require("../../models");

// Current location  "http:localhost:3001/teacher/guardian/"

// -----------OLD CODE----------//
// router.get("/", async (req, res) => {
//   try {
//     const guardianData = await Guardian.findAll({
//       include: [
//         {
//           model: Student,
//           attributes: {
//             exclude: [
//               "inProgessGrade",
//               "teacherId",
//               "attendanceId",
//               "behaviorId",
//               "communicationId",
//               "assignmentFeedbackId",
//             ],
//           },
//         },
//       ],
//     });
//     res.status(200).json(guardianData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.get("/:id", async (req, res) => {
//   try {
//     const guardianData = await Guardian.findByPk(req.params.id);
//     if (!guardianData) {
//       res.status(404).json({ message: `no guardian found with id of ${req.params.id}` });
//     }
//     res.status(200).json(guardianData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.post("/", async (req, res) => {
//   try {
//     const newGuardian = await Guardian.create({
//       firstName: req.body.firstName,
//       lastName: req.body.lastName,
//       email: req.body.email,
//       phoneNumber: req.body.phoneNumber,
//     });
//     res.status(200).json({ message: "Guardian Created!" });
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// router.put("/:id", async (req, res) => {
//   try {
//     const updatedguardian = await Guardian.update(req.body, { where: { id: req.params.id } });
//     if (!updatedguardian[0]) {
//       res.status(404).json({ message: `no guardian found with the id of ${req.params.id}` });
//     }
//     res.status(200).json({ message: `guardian with id of ${req.params.id} updated` });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.delete("/:id", async (req, res) => {
//   try {
//     const deletedguardian = await Guardian.destroy({ where: { id: req.params.id } });
//     if (!deletedguardian) {
//       res.status(404).json({ message: `no guardian with id ${req.params.id} found` });
//     }
//     res.status(200).json({ message: `guardian with id ${req.params.id} deleted` });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

//thunder client

module.exports = router;
