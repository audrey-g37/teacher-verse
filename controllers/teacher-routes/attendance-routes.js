const router = require("express").Router();
const { Attendance, Student } = require("../../models");
const moment = require("moment");

router.get("/new-attendance", async (req, res) => {
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
      const alphaStudentData = studentData.sort(function (a, b) {
        if (a.lastName < b.lastName) {
          return -1;
        } else if (a.lastName > b.lastName) {
          return 1;
        } else if (a.lastName == b.lastName) {
          if (a.firstName < b.firstName) {
            return -1;
          } else return 1;
        } else return 0;
      });
      const currentDate = moment().format("MM-DD-YYYY");
      const dbPriorAttendanceData = await Attendance.findAll({
        where: { teacherId: req.session.teacherId },
      });
      const priorAttendanceData = dbPriorAttendanceData.map((attendance) =>
        attendance.get({ plain: true })
      );
      if (priorAttendanceData.length === 0) {
        res.render("new_attendance", {
          date: currentDate,
          studentData: alphaStudentData,
          loggedIn: req.session.loggedIn,
        });
      } else {
        const lastAttendanceEntry =
          priorAttendanceData[priorAttendanceData.length - 1];
        // console.log(lastAttendanceEntry);

        if (lastAttendanceEntry.date === currentDate) {
          res.redirect("/teacher/attendance/update-attendance");
        } else {
          res.render("new_attendance", {
            date: currentDate,
            studentData: alphaStudentData,
            loggedIn: req.session.loggedIn,
          });
        }
      }
    }
  } catch (err) {
    res.render("404");
  }
});

router.post("/new-attendance", async (req, res) => {
  try {
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
    const newAttendanceData = req.body;
    dataTypeChange(newAttendanceData.studentId, newAttendanceData.isPresent);
    const attendanceDataToSave = {
      isPresent: presenceArray,
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
        teacherId: req.session.teacherId,
      });
    }

    res.redirect("/teacher/attendance/update-attendance");
  } catch (err) {
    res.render("data_error");
  }
});

router.get("/update-attendance", async (req, res) => {
  try {
    const currentDate = moment().format("MM-DD-YYYY");
    const dbPriorAttendanceData = await Attendance.findAll({
      where: { date: currentDate, teacherId: req.session.teacherId },
    });
    const priorAttendanceData = dbPriorAttendanceData.map((attendance) =>
      attendance.get({ plain: true })
    );
    const dbStudentData = await Student.findAll({
      where: { teacherId: req.session.teacherId },
    });
    const studentData = dbStudentData.map((student) =>
      student.get({ plain: true })
    );
    const alphaStudentData = studentData.sort(function (a, b) {
      if (a.lastName < b.lastName) {
        return -1;
      } else if (a.lastName > b.lastName) {
        return 1;
      } else if (a.lastName == b.lastName) {
        if (a.firstName < b.firstName) {
          return -1;
        } else return 1;
      } else return 0;
    });
    // console.log(priorAttendanceData);
    res.render("update_attendance", {
      date: currentDate,
      studentData: alphaStudentData,
      attendanceData: priorAttendanceData,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.render("404");
  }
});

router.put("/update-attendance", async (req, res) => {
  try {
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

    const dbPriorAttendanceData = await Attendance.findAll({
      where: { teacherId: req.session.teacherId, date: todaysDate },
    });
    const priorAttendanceData = dbPriorAttendanceData.map((attendance) =>
      attendance.get({ plain: true })
    );
    // console.log(priorAttendanceData);

    const newAttendanceData = req.body;
    dataTypeChange(newAttendanceData.studentId, newAttendanceData.isPresent);
    const attendanceDataToSave = {
      isPresent: presenceArray,
      date: todaysDate,
      time: newAttendanceData.time,
      notes: newAttendanceData.notes,
      studentId: studentIdArray,
    };

    // console.log(attendanceDataToSave);

    for (let j = 0; j < attendanceDataToSave.studentId.length; j++) {
      await Attendance.update(
        {
          isPresent: attendanceDataToSave.isPresent[j],
          time: attendanceDataToSave.time[j],
          notes: attendanceDataToSave.notes[j],
        },
        {
          where: {
            studentId: attendanceDataToSave.studentId[j],
          },
        }
      );
      // await Attendance.create({
      //   isPresent: attendanceDataToSave.isPresent[j],
      //   date: todaysDate,
      //   time: attendanceDataToSave.time[j],
      //   notes: attendanceDataToSave.notes[j],
      //   studentId: attendanceDataToSave.studentId[j],
      //   teacherId: req.session.teacherId,
      // });
    }
    res.redirect("/teacher");
  } catch (err) {
    res.render("data_error");
  }
});

// Current location  "http:localhost:3001/teacher/attendance"
// router.get("/", async (req, res) => {
//   try {
//     const currentDate = moment().format("MM-DD-YYYY");
//     const dbStudentData = await Student.findAll({
//       where: { teacherId: req.session.teacherId },
//     });
//     const studentData = dbStudentData.map((student) =>
//       student.get({ plain: true })
//     );

//     if (studentData.length === 0) {
//       res.render("no_students");
//     } else {
//       const dbAttendanceData = await Attendance.findAll({
//         where: { teacherId: req.session.teacherId },
//       });
//       const attendanceData = dbAttendanceData.map((attendance) =>
//         attendance.get({ plain: true })
//       );
//       const howManyRecords = studentData.length * 10;

//       let pastRecords = [];

//       if (attendanceData.length >= howManyRecords) {
//         for (
//           let i = attendanceData.length - howManyRecords;
//           i < attendanceData.length;
//           i++
//         ) {
//           pastRecords.push(attendanceData[i]);
//         }
//       } else {
//         pastRecords = attendanceData;
//       }

//       // console.log(pastRecords);

//       let studentAttendanceMatched = [];

//       // console.log(studentData);

//       for (let i = 0; i < studentData.length; i++) {
//         for (let j = 0; j < pastRecords.length; j++) {
//           if (studentData[i].id === pastRecords[j].studentId) {
//             studentAttendanceMatched.push(pastRecords[j]);
//           }
//         }
//       }
//       // console.log(studentAttendanceMatched);

//       let pastTenDates = [];

//       for (let i = 0; i < studentAttendanceMatched.length; i++) {
//         if (pastTenDates.indexOf(studentAttendanceMatched[i].date) == -1) {
//           pastTenDates.push(studentAttendanceMatched[i].date);
//         } else {
//           i++;
//         }
//       }

//       let studentPastAttendance = [];
//       function sortAttendanceDataByStudent(attendanceArray) {
//         for (let i = 0; i < studentData.length; i++) {
//           for (let j = 0; j < attendanceArray.length; j++) {
//             if (
//               attendanceArray[j].studentId === studentData[i].id &&
//               studentPastAttendance.indexOf(attendanceArray[j] == -1)
//             ) {
//               studentPastAttendance.push(attendanceArray[j]);
//             } else {
//               i++;
//             }
//           }
//         }
//       }

//       sortAttendanceDataByStudent(studentAttendanceMatched);

//       // console.log(studentPastAttendance);

//       // console.log(pastTenDates);

//       res.render("all_attendance", {
//         studentData: studentData,
//         attendanceDates: pastTenDates,
//         studentAttendanceMatched: studentAttendanceMatched,
//         loggedIn: req.session.loggedIn,
//       });
//     }
//   } catch (err) {
//     res.render("404");
//   }
// });

// router.get("/:id", async (req, res) => {
//   try {
//     const attendanceData = await Attendance.findByPk(req.params.id);
//     if (!attendanceData) {
//       res.status(404).json({
//         message: `no attendance data found with id of ${req.params.id}`,
//       });
//     }
//     res.status(200).json(attendanceData);
//   } catch (err) {
//     res.render("404");
//   }
// });

// router.put("/:id", async (req, res) => {
//   try {
//     const updatedAttendance = await Attendance.update(req.body, {
//       where: { id: req.params.id },
//     });
//     if (!updatedAttendance[0]) {
//       res.status(404).json({
//         message: `no attendance data found with the id of ${req.params.id}`,
//       });
//     }
//     res
//       .status(200)
//       .json({ message: `Attendance with id of ${req.params.id} updated` });
//   } catch (err) {
//     res.render("404");
//   }
// });

// router.delete("/:id", async (req, res) => {
//   try {
//     const deletedAttendance = await Attendance.destroy({
//       where: { id: req.params.id },
//     });
//     if (!deletedAttendance) {
//       res
//         .status(404)
//         .json({ message: `no attendence data with id ${req.params.id} found` });
//     }
//     res
//       .status(200)
//       .json({ message: `Attendance data with id ${req.params.id} deleted` });
//   } catch (err) {
//     res.render("404");
//   }
// });

//thunder client

module.exports = router;
