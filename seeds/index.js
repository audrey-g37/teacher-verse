// bring in required libraries
const sequelize = require("../config/connection");

// bring in models
const {
  Teacher,
  Student,
  Guardian,
  Assignment,
  AssignmentFeedback,
  Attendance,
  Behavior,
  Communication,
} = require("../models");

// bring in seed objects
const TeacherData = require("./teacher.json");
const AssignmentData = require("./assignment.json");
const AssignmentFeedbackData = require("./assignmentFeedback.json");
const AttendanceData = require("./attendance.json");
const BehaviorData = require("./behavior.json");
const CommunicationData = require("./communication.json");
const GuardianData = require("./guardian.json");
const StudentData = require("./student.json");

// function to seed database
const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    const teacher = await Teacher.bulkCreate(TeacherData);
    const attendance = await Attendance.bulkCreate(AttendanceData);
    const guardian = await Guardian.bulkCreate(GuardianData);
    const communication = await Communication.bulkCreate(CommunicationData);
    const behavior = await Behavior.bulkCreate(BehaviorData);
    const assignment = await Assignment.bulkCreate(AssignmentData);
    const assignmentFeedback = await AssignmentFeedback.bulkCreate(AssignmentFeedbackData);
    const student = await Student.bulkCreate(StudentData);
  } catch (err) {
    console.log("Error in seeding database");
  }
};

seedDatabase();
