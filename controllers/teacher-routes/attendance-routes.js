const router = require("express").Router();
const { Attendance, Student } = require("../../models");

// Current location  "http:localhost:3001/api/attendance"
router.get("/", async (req, res) => {
  try {
    const dbStudentData = await Student.findAll({});
    const studentData = dbStudentData.map((student) =>
      student.get({ plain: true })
    );
    const dbAttendanceData = await Attendance.findAll({});
    const attendanceData = dbAttendanceData.map((attendance) =>
      attendance.get({ plain: true })
    );

    const howManyRecords = studentData.length * 10;

    let pastRecords = [];

    if (attendanceData.length >= howManyRecords) {
      for (
        let i = attendanceData.length - howManyRecords;
        i < attendanceData.length;
        i++
      ) {
        pastRecords.push(attendanceData[i]);
      }
    } else {
      pastRecords = attendanceData;
    }

    // console.log(pastRecords);

    // for (let i=0; i<studentData.length; i++) {
    //     let studentAttendanceMatched = [];
    // }

    let studentAttendanceMatched = [];

    for (let i = 0; i < pastRecords.length; i++) {
      if (studentData[0].id === pastRecords[i].studentId) {
        studentAttendanceMatched.push(pastRecords[i]);
      }
    }
    console.log(studentAttendanceMatched);

    let pastTenDates = [];

    for (let i = 0; i < studentAttendanceMatched.length; i++) {
      pastTenDates.push(studentAttendanceMatched[i].date);
    }

    console.log(pastTenDates);

    res.render("all_attendance", {
      studentData: studentData,
      attendanceDates: pastTenDates,
      studentAttendanceMatched: studentAttendanceMatched,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/new-attendance", async (req, res) => {
  try {
    const dbStudentData = await Student.findAll({});
    const studentData = dbStudentData.map((student) =>
      student.get({ plain: true })
    );
    res.render("new_attendance", {
      studentData,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const attendanceData = await Attendance.findByPk(req.params.id);
    if (!attendanceData) {
      res.status(404).json({
        message: `no attendance data found with id of ${req.params.id}`,
      });
    }
    res.status(200).json(attendanceData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/new-attendance", async (req, res) => {
  console.log(req.body);
  let presenceArray = [];
  let studentIdArray = [];
  function dataTypeChange(studentIds, isPresent) {
    for (let i = 0; i < studentIds.length; i++) {
      if (isPresent[i] === "true") {
        presenceArray.push(true);
      } else {
        presenceArray.push(false);
      }
      const integerId = parseInt(studentIds[i]);
      studentIdArray.push(integerId);
    }
  }
  try {
    const allAttendanceData = req.body;
    dataTypeChange(allAttendanceData.studentId, allAttendanceData.isPresent);
    const attendanceDataToSave = {
      isPresent: presenceArray,
      time: allAttendanceData.time,
      notes: allAttendanceData.notes,
      studentId: studentIdArray,
    };

    for (let i = 0; i < attendanceDataToSave.studentId.length; i++) {
      Attendance.create({
        isPresent: attendanceDataToSave.isPresent[i],
        time: attendanceDataToSave.time[i],
        notes: attendanceDataToSave.notes[i],
        studentId: attendanceDataToSave.studentId[i],
      });
    }

    // let studentAttendance;
    // function saveAttendance (array) {

    // }

    // const newAttendence = await Attendance.create({

    // });
    // res.redirect("/teacher");
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedAttendance = await Attendance.update(req.body, {
      where: { id: req.params.id },
    });
    if (!updatedAttendance[0]) {
      res.status(404).json({
        message: `no attendance data found with the id of ${req.params.id}`,
      });
    }
    res
      .status(200)
      .json({ message: `Attendance with id of ${req.params.id} updated` });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedAttendance = await Attendance.destroy({
      where: { id: req.params.id },
    });
    if (!deletedAttendance) {
      res
        .status(404)
        .json({ message: `no attendence data with id ${req.params.id} found` });
    }
    res
      .status(200)
      .json({ message: `Attendance data with id ${req.params.id} deleted` });
  } catch (err) {
    res.status(500).json(err);
  }
});

//thunder client

module.exports = router;
