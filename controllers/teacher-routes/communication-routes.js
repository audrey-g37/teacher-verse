const router = require("express").Router();
const { Communication, Behavior, Student } = require("../../models");

router.get("/new-communication", async (req, res) => {
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
      res.render("new_communication", {
        studentData,
        loggedIn: req.session.loggedIn,
      });
    }
  } catch (err) {
    res.render("404");
  }
});

router.post("/new-communication", async (req, res) => {
  try {
    console.log(req.body);
    const newCommunication = await Communication.create(req.body);
    res.redirect("/teacher/student");
  } catch (err) {
    res.render("data_error");
  }
});

// Current location  "http:localhost:3001/api/communication"

// router.get("/", async (req, res) => {
//   try {
//     const communicationData = await Communication.findAll({
//       include: [{ model: Behavior }],
//     });
//     res.status(200).json(communicationData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.get("/:id", async (req, res) => {
//   try {
//     const communicationData = await Communication.findByPk(req.params.id);
//     if (!communicationData) {
//       res.status(404).json({
//         message: `no communication data found with id of ${req.params.id}`,
//       });
//     }
//     res.status(200).json(communicationData);
//   } catch (err) {
//     res.render("404");
//   }
// });

// router.put("/:id", async (req, res) => {
//   try {
//     const updatedCommunication = await Communication.update(req.body, {
//       where: { id: req.params.id },
//     });
//     if (!updatedCommunication[0]) {
//       res.status(404).json({
//         message: `no communication data found with the id of ${req.params.id}`,
//       });
//     }
//     res
//       .status(200)
//       .json({ message: `communication with id of ${req.params.id} updated` });
//   } catch (err) {
//     res.render("404");
//   }
// });

// router.delete("/:id", async (req, res) => {
//   try {
//     const deletedCommunication = await Communication.destroy({
//       where: { id: req.params.id },
//     });
//     if (!deletedCommunication) {
//       res.status(404).json({
//         message: `no communication data with id ${req.params.id} found`,
//       });
//     }
//     res
//       .status(200)
//       .json({ message: `communication with id ${req.params.id} deleted` });
//   } catch (err) {
//     res.render("404");
//   }
// });

//thunder client

module.exports = router;
