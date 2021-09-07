// bring in required models

const Teacher = require("./teacher");
const Assignment = require("./assignment");
const AssignmentFeedback = require("./assignmentFeedback");
const Attendance = require("./attendence");
const Behavior = require("./behavior");
const Communication = require("./communication");
const Guardian = require("./guardian");
const Student = require("./student");
const StudentAttendance = require("./studentAttendance");
const StudentBehavior = require("./studentBehavior");
const StudentCommunication = require("./studentCommunication");
const StudentAssignmentFeedback = require("./studentAssignmentFeedback");

// Teacher associations
Teacher.hasMany(Student, {
  foreignKey: "teacherId",
  onDelete: "SET NULL",
});

Student.belongsTo(Teacher, {
  foreignKey: "teacherId",
});

// Attendance associations
Attendance.hasMany(Student, {
  foreignKey: "attendanceId",
});

Student.belongsToMany(Attendance, {
  through: StudentAttendance,
});

Attendance.belongsToMany(Student, {
  through: StudentAttendance,
});

// Behavior associations
Behavior.hasMany(Student, {
  foreignKey: "behaviorId",
});

Student.belongsToMany(Behavior, {
  through: StudentBehavior,
});

Behavior.belongsToMany(Student, {
  through: StudentBehavior,
});

// Guardian associations
Guardian.hasOne(Student, {
  foreignKey: "guardianId",
  onDelete: "SET NULL",
});

Student.belongsTo(Guardian, {
  foreignKey: "guardianId",
});

// Communication assignments
Communication.hasMany(Student, {
  foreignKey: "communicationId",
});

Student.belongsToMany(Communication, {
  through: StudentCommunication,
});

Communication.belongsToMany(Student, {
  through: StudentCommunication,
});

// Assignment associations
Assignment.hasMany(AssignmentFeedback, {
  foreignKey: "assignmentId",
});

AssignmentFeedback.belongsTo(Assignment, {
  foreignKey: "assignmentId",
});

AssignmentFeedback.hasOne(Student, {
  foreignKey: "assignmentFeedbackId",
});

Student.belongsToMany(AssignmentFeedback, {
  through: StudentAssignmentFeedback,
});

module.exports = {
  Teacher,
  Assignment,
  AssignmentFeedback,
  Attendance,
  Behavior,
  Communication,
  Guardian,
  Student,
  StudentAttendance,
  StudentBehavior,
  StudentCommunication,
  StudentAssignmentFeedback,
};
