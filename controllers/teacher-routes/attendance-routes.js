const router = require("express").Router();
const { Attendance, Student } = require("../../models");
const moment = require("moment");
// Current location  "http:localhost:3001/teacher/attendance"
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
    // console.log(studentAttendanceMatched);

    let pastTenDates = [];

    for (let i = 0; i < studentAttendanceMatched.length; i++) {
      pastTenDates.push(studentAttendanceMatched[i].date);
    }

    // console.log(pastTenDates);

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
    const currentDate = moment().format("MM-DD-YYYY");
    const dbStudentData = await Student.findAll({});
    const studentData = dbStudentData.map((student) =>
      student.get({ plain: true })
    );
    res.render("new_attendance", {
      date: currentDate,
      studentData: studentData,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/update-attendance", async (req, res) => {
  try {
    const dbStudentData = await Student.findAll({});
    const studentData = dbStudentData.map((student) =>
      student.get({ plain: true })
    );
    res.render("update_attendance", {
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
  // const todaysDate = moment().format("MM-DD-YYYY");
  // console.log(todaysDate);

  // const dbPriorAttendanceData = Attendance.findAll({});
  // const priorAttendanceData = (await dbPriorAttendanceData).map((attendance) =>
  //   attendance.get({ plain: true })
  // );
  // console.log(priorAttendanceData);

  try {
    const newAttendanceData = req.body;
    console.log(newAttendanceData);
    dataTypeChange(newAttendanceData.studentId, newAttendanceData.isPresent);
    const attendanceDataToSave = {
      isPresent: presenceArray,
      // date: todaysDate,
      time: newAttendanceData.time,
      notes: newAttendanceData.notes,
      studentId: studentIdArray,
    };

    // console.log(attendanceDataToSave);

    for (let i = 0; i < attendanceDataToSave.studentId.length; i++) {
      await Attendance.create({
        isPresent: attendanceDataToSave.isPresent[i],
        time: attendanceDataToSave.time[i],
        notes: attendanceDataToSave.notes[i],
        studentId: attendanceDataToSave.studentId[i],
      });
    }

    // for (let i = 0; i < priorAttendanceData.length; i++) {
    //   if (priorAttendanceData[i].date === attendanceDataToSave.date) {
    //     console.log("in the dates are equal statement");
    //     for (let j = 0; j < attendanceDataToSave.studentId.length; j++) {
    //       await Attendance.update(
    //         {
    //           isPresent: attendanceDataToSave.isPresent[j],
    //           time: attendanceDataToSave.time[j],
    //           notes: attendanceDataToSave.notes[j],
    //         },
    //         {
    //           where: { studentId: attendanceDataToSave.studentId[j] },
    //         }
    //       );
    //     }
    //   } else {
    //     for (let k = 0; k < attendanceDataToSave.studentId.length; k++) {
    //       await Attendance.create({
    //         isPresent: attendanceDataToSave.isPresent[k],
    //         time: attendanceDataToSave.time[k],
    //         notes: attendanceDataToSave.notes[k],
    //         studentId: attendanceDataToSave.studentId[k],
    //       });
    //     }
    //     return;
    //   }
    // }

    // let studentAttendance;
    // function saveAttendance (array) {

    // }

    // const newAttendence = await Attendance.create({

    // });
    res.redirect("/teacher/attendance/update-attendance");
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/update-attendance", async (req, res) => {
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
  const todaysDate = moment().format("MM-DD-YYYY");
  // console.log(todaysDate);

  const dbPriorAttendanceData = await Attendance.findAll({});
  const priorAttendanceData = dbPriorAttendanceData.map((attendance) =>
    attendance.get({ plain: true })
  );
  console.log(priorAttendanceData);

  try {
    const newAttendanceData = req.body;
    // console.log(newAttendanceData);
    dataTypeChange(newAttendanceData.studentId, newAttendanceData.isPresent);
    const attendanceDataToSave = {
      isPresent: presenceArray,
      date: todaysDate,
      time: newAttendanceData.time,
      notes: newAttendanceData.notes,
      studentId: studentIdArray,
    };

    // console.log(attendanceDataToSave);

    for (let i = 0; i < priorAttendanceData.length; i++) {
      for (let j = 0; j < newAttendanceData.studentId.length; j++) {
        await Attendance.update(
          {
            isPresent: attendanceDataToSave.isPresent[j],
            time: attendanceDataToSave.time[j],
            notes: attendanceDataToSave.notes[j],
          },
          {
            where: {
              studentId: attendanceDataToSave.studentId[j],
              date: attendanceDataToSave.date,
            },
          }
        );
      }
    }
    res.redirect("/teacher");
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
