const router = require('express').Router();
const assignmentRoutes = require('./assignment-routes');
const assignmentFeedbackRoutes = require('./assignmentFeedback-routes');
const behaviorRoutes = require ('./behavior-routes');
const attendanceRoutes = require ('./attendance-routes');
const communicationRoutes = require('./communication-routes');
const guardianRoutes = require('./guardian-routes');
const teacherRoutes = require('./teacher-routes');
const studentRoutes = require('./student-routes');



router.use('/assignment', assignmentRoutes);
router.use('/assignmentFeedback', assignmentFeedbackRoutes);
router.use('/behavior', behaviorRoutes);
router.use('/attendance', attendanceRoutes);
router.use('/communication', communicationRoutes)
router.use('/guardian', guardianRoutes)
router.use('/teacher', teacherRoutes);
router.use('/student',studentRoutes);





module.exports = router;