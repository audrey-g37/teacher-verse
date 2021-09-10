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
    const studentData = dbStudentData.map((student) =>
      student.get({ plain: true })
    );
    res.render("all_students", { studentData });
    res.status(200);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    let studentData = await Student.findByPk(req.params.id, {
      include: [
  
        { model: Guardian },
      ],
    });
    studentData = studentData.get({plain:true})
    let studentAttendance = await Attendance.findAll();
    const attendanceData = studentAttendance.map((attendance) =>
      attendance.get({ plain: true })
    );
    const studentAttendanceAll = attendanceData.filter(function (el){return el.studentId == req.params.id});
    
    console.log(studentData);
    
const attendanceById={...studentAttendanceAll};
console.log(attendanceById)

    // let allData = [];
  // allData.push(studentData).push(studentAttendanceAll);

  //   console.log(allData);

    if (!studentData) {
      res
        .status(404)
        .json({ message: `no Student found with id of ${req.params.id}` });
    }
    // res.status(200).json(studentData)
    res.render("single_student", {data1:studentData, data2:attendanceById});
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const newStudent = await Student.create(req.body);
    res.status(200).json({ message: "Student Created!" });
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
