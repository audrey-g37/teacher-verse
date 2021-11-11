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
const moment = require("moment");

// Current location  "http:localhost:3001/teacher/student"
router.get("/", async (req, res) => {
  try {
    // const teacherIdToUse = localStorage.getItem("teacherId");
    const dbStudentData = await Student.findAll();
    const studentData = dbStudentData.map((student) =>
      student.get({ plain: true })
    );
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
    const teacherData = dbTeacherData.map((teacher) =>
      teacher.get({ plain: true })
    );
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
    const studentData = dbStudentData.map((student) =>
      student.get({ plain: true })
    );
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
    const dbGuardianData = await Guardian.findAll({
      where: { studentId: req.params.id },
    });
    const guardianData = dbGuardianData.map((guardian) =>
      guardian.get({ plain: true })
    );

    // ---------single student ATTENDANCE data------------- //
    const dbAttendanceData = await Attendance.findAll({
      where: { studentId: req.params.id },
    });
    const attendanceData = dbAttendanceData
      .map((attendance) => attendance.get({ plain: true }))
      .sort((first, second) => {
        first.updatedAt - second.updatedAt;
      });
    const attendanceDataLength = attendanceData.length;

    let lastThreeAttendance = [];
    if (attendanceDataLength >= 3) {
      for (let i = attendanceDataLength - 3; i < attendanceDataLength; i++) {
        lastThreeAttendance.push(attendanceData[i]);
      }
    } else {
      lastThreeAttendance = attendanceData;
    }

    // ---------single student COMMUNICATIONS data------------- //
    const dbCommunicationData = await Communication.findAll({
      where: { studentId: req.params.id },
    });
    const communicationData = dbCommunicationData.map((communication) =>
      communication.get({ plain: true })
    );
    // .sort((first, second) => {
    //   first.dateOfCommunication - second.dateOfCommunication;
    // });
    const communicationDataLength = communicationData.length;

    console.log(communicationData);

    let lastTwoCommunication = [];
    if (communicationDataLength >= 2) {
      let communicationToPush;
      for (
        let i = communicationDataLength - 2;
        i < communicationDataLength;
        i++
      ) {
        const formatDate = moment(
          communicationData[i].dateOfCommunication
        ).format("MM-DD-YYYY");
        communicationToPush = {
          id: communicationData[i].id,
          communicationMethod: communicationData[i].communicationMethod,
          description: communicationData[i].description,
          dateOfCommunication: formatDate,
          followUpNeeded: communicationData[i].followUpNeeded,
          studentId: communicationData[i].studentId,
          createdAt: communicationData[i].createdAt,
          updatedAt: communicationData[i].updatedAt,
        };
        lastTwoCommunication.push(communicationToPush);
      }
    } else {
      let communicationToPush;
      for (let i = 0; i < communicationDataLength; i++) {
        const formatDate = moment(
          communicationData[i].dateOfCommunication
        ).format("MM-DD-YYYY");
        communicationToPush = {
          id: communicationData[i].id,
          communicationMethod: communicationData[i].communicationMethod,
          description: communicationData[i].description,
          dateOfCommunication: formatDate,
          followUpNeeded: communicationData[i].followUpNeeded,
          studentId: communicationData[i].studentId,
          createdAt: communicationData[i].createdAt,
          updatedAt: communicationData[i].updatedAt,
        };
        lastTwoCommunication.push(communicationToPush);
      }
    }

    // ---------single student ASSIGNMENT FEEDBACK data------------- //
    let studentAssignmentFeedback = await AssignmentFeedback.findAll();
    const assignmentFeedbackData = studentAssignmentFeedback.map(
      (assignmentFeedback) => assignmentFeedback.get({ plain: true })
    );
    const studentAssignmentFeedbackAll = assignmentFeedbackData.filter(
      function (el) {
        return el.studentId == req.params.id;
      }
    );
    const assignmentFeedbackById = { ...studentAssignmentFeedbackAll };

    // ---------single student BEHAVIORS data------------- //
    let dbBehavior = await Behavior.findAll({
      where: { studentId: req.params.id },
    });
    const behaviorData = dbBehavior
      .map((behavior) => behavior.get({ plain: true }))
      .sort((first, second) => {
        first.updatedAt - second.updatedAt;
      });
    const behaviorDataLength = behaviorData.length;

    let lastTwoBehavior = [];
    if (behaviorDataLength >= 2) {
      for (let i = behaviorDataLength - 2; i < behaviorDataLength; i++) {
        lastTwoBehavior.push(behaviorData[i]);
      }
    } else {
      lastTwoBehavior = behaviorData;
    }

    if (!studentData) {
      res
        .status(404)
        .json({ message: `no Student found with id of ${req.params.id}` });
    }

    console.log(studentData);
    console.log(guardianData);
    console.log(lastThreeAttendance);
    console.log(lastTwoCommunication);
    console.log(lastTwoBehavior);

    res.render("single_student", {
      data1: studentData,
      data2: lastThreeAttendance,
      data3: lastTwoCommunication,
      data4: assignmentFeedbackById,
      data5: lastTwoBehavior,
      data6: guardianData,
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
      res
        .status(404)
        .json({ message: `no Student found with the id of ${req.params.id}` });
    }
    res
      .status(200)
      .json({ message: `Student with id of ${req.params.id} updated` });
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
      res
        .status(404)
        .json({ message: `no Student with id ${req.params.id} found` });
    }
    res
      .status(200)
      .json({ message: `Student with id ${req.params.id} deleted` });
  } catch (err) {
    res.status(500).json(err);
  }
});

//thunder client

module.exports = router;
