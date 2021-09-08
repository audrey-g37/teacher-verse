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
    const student = await Student.bulkCreate(StudentData);
    const attendance = await Attendance.bulkCreate(AttendanceData);
    const behavior = await Behavior.bulkCreate(BehaviorData);
    const guardian = await Guardian.bulkCreate(GuardianData);
    const communication = await Communication.bulkCreate(CommunicationData);
    const assignment = await Assignment.bulkCreate(AssignmentData);
    const assignmentFeedback = await AssignmentFeedback.bulkCreate(AssignmentFeedbackData);
  } catch (err) {
    console.log("Error in seeding database");
  }
};

seedDatabase();
