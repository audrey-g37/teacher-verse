const sequelize = require("../config/connection");

const {
  Assignment,
  AssignmentFeedback,
  Attendance,
  Behavior,
  Communication,
  Guardian,
  Student,
  Teacher,
} = require("../models");

const TeacherData = require("./teacher.json");
const AssignmentData = require("./assigment.json");
const AssignmentFeedbackData = require("./assignmentFeedback.json");
const AttendanceData = require("./attendance.json");
const BehaviorData = require("./behavior.json");
const CommunicationData = require("./communication.json");
const GuardianData = require("./guardian.json");
const StudentData = require("./student.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const teacher = await Teacher.bulkCreate(TeacherData);

  // for (const {id} of teacher) {
  //     const newStudent = await Student.create({
  //         teacherId = id
  //     })
  // }
};
