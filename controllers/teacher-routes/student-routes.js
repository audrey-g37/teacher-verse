const router = require("express").Router();
const {
  Student,
  Teacher,
  Assignment,
  AssignmentFeedback,
  Attendance,
  Behavior,
  Communication,
  Guardian,
  StudentAssignmentFeedback,
  StudentAttendance,
  StudentBehavior,
  StudentCommunication,
} = require("../../models");

// Current location  "http:localhost:3001/teacher/student"
router.get("/", async (req, res) => {
  try {
    const dbStudentData = await Student.findAll({ include: Guardian });
    const studentData = dbStudentData.map((student) => student.get({ plain: true }));
    res.render("all_students", { studentData, loggedIn: req.session.loggedIn });
    res.status(200);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/new-student", async (req, res) => {
  try {
    const dbTeacherData = await Teacher.findAll({
      attributes: ["id", "firstName", "lastName"],
    });
    const teacherData = dbTeacherData.map((teacher) => teacher.get({ plain: true }));
    res.render("new_student", { teacherData, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/new-guardian", async (req, res) => {
  try {
    const dbStudentData = await Student.findAll({
      attributes: ["id", "firstName", "lastName"],
    });
    const studentData = dbStudentData.map((student) => student.get({ plain: true }));
    res.render("new_guardian", { studentData, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    let studentData = await Student.findByPk(req.params.id);
    studentData = studentData.get({ plain: true });

    // ---------SECTION TO GET STUDENT DATA FOR SINGLE STUDENT HANLDEBAR------------- //

    // ---------single student GUARDIAN data------------- //
    let studentGuardian = await Guardian.findAll();
    const guardianData = studentGuardian.map((guardian) => guardian.get({ plain: true }));
    const studentGuardianAll = guardianData.filter(function (el) {
      return el.studentId == req.params.id;
    });
    const guardianById = { ...studentGuardianAll };

    // ---------single student ATTENDANCE data------------- //
    let studentAttendance = await Attendance.findAll();
    const attendanceData = studentAttendance.map((attendance) => attendance.get({ plain: true }));
    const studentAttendanceAll = attendanceData.filter(function (el) {
      return el.studentId == req.params.id;
    });
    const attendanceById = { ...studentAttendanceAll };

    // ---------single student COMMUNICATIONS data------------- //
    let studentCommunication = await Communication.findAll();
    const communicationData = studentCommunication.map((communication) => communication.get({ plain: true }));
    const studentCommunicationAll = communicationData.filter(function (el) {
      return el.studentId == req.params.id;
    });
    const communicationById = { ...studentCommunicationAll };

    // ---------single student ASSIGNMENT FEEDBACK data------------- //
    let studentAssignmentFeedback = await AssignmentFeedback.findAll();
    const assignmentFeedbackData = studentAssignmentFeedback.map((assignmentFeedback) =>
      assignmentFeedback.get({ plain: true })
    );
    const studentAssignmentFeedbackAll = assignmentFeedbackData.filter(function (el) {
      return el.studentId == req.params.id;
    });
    const assignmentFeedbackById = { ...studentAssignmentFeedbackAll };

    // ---------single student BEHAVIORS data------------- //
    let studentBehavior = await Behavior.findAll();
    const behaviorData = studentBehavior.map((behavior) => behavior.get({ plain: true }));
    const studentBehaviorAll = behaviorData.filter(function (el) {
      return el.studentId == req.params.id;
    });
    const behaviorById = { ...studentBehaviorAll };
    if (!studentData) {
      res.status(404).json({ message: `no Student found with id of ${req.params.id}` });
    }
    res.render("single_student", {
      data1: studentData,
      data2: attendanceById,
      data3: communicationById,
      data4: assignmentFeedbackById,
      data5: behaviorById,
      data6: guardianById,

      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/new-student", async (req, res) => {
  try {
    const newStudent = await Student.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      teacherId: req.body.teacherId,
    });

    res.redirect("/teacher/student");
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/new-guardian", async (req, res) => {
  try {
    const newGuardian = await Guardian.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      studentId: req.body.studentId,
    });
    res.redirect("/teacher");
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedStudent = await Student.update(req.body, {
      where: { id: req.params.id },
    });
    if (!updatedStudent[0]) {
      res.status(404).json({ message: `no Student found with the id of ${req.params.id}` });
    }
    res.status(200).json({ message: `Student with id of ${req.params.id} updated` });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedStudent = await Student.destroy({
      where: { id: req.params.id },
    });
    if (!deletedStudent) {
      res.status(404).json({ message: `no Student with id ${req.params.id} found` });
    }
    res.status(200).json({ message: `Student with id ${req.params.id} deleted` });
  } catch (err) {
    res.status(500).json(err);
  }
});

//thunder client

module.exports = router;
