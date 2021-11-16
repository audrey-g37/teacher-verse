// bring in required models
const Teacher = require("./teacher");
const Assignment = require("./assignment");
const AssignmentFeedback = require("./assignmentFeedback");
const Attendance = require("./attendence");
const Behavior = require("./behavior");
const Communication = require("./communication");
const Guardian = require("./guardian");
const Student = require("./student");

// Teacher associations
Teacher.hasMany(Student, {
  foreignKey: "teacherId",
  onDelete: "SET NULL",
});

Teacher.hasMany(Attendance, {
  foreignKey: "teacherId",
});

Student.hasMany(Attendance, {
  // through: StudentAttendance,
  foreignKey: "studentId",
});

Attendance.belongsTo(Teacher, {
  foreignKey: "teacherId",
});

// Behavior associations
Student.hasMany(Behavior, {
  foreignKey: "studentId",
});
Behavior.belongsTo(Communication, {
  foreignKey: "communicationId",
});

// Guardian associations
Student.hasMany(Guardian, {
  foreignKey: "studentId",
});

Guardian.belongsTo(Student, {
  foreignKey: "studentId",
});

// Communication assignments
Student.hasMany(Communication, {
  foreignKey: "studentId",
});

Communication.belongsTo(Student, {
  foreignKey: "studentId",
});

// Assignment associations

Assignment.hasMany(AssignmentFeedback, {
  foreignKey: "assignmentId",
});

AssignmentFeedback.belongsTo(Assignment, {
  foreignKey: "assignmentId",
});

AssignmentFeedback.belongsTo(Student, {
  foreignKey: "studentId",
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
};
