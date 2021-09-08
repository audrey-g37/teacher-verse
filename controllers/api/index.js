const router = require('express').Router();
const assignmentRoutes = require('./assignment-routes');
const assignmentFeedbackRoutes = require('./assignmentFeedback-routes');
const behaviorRoutes = require ('./behavior-routes');




router.use('/assignment', assignmentRoutes);
router.use('/assignmentFeedback', assignmentFeedbackRoutes)
router.use('/behavior', behaviorRoutes)





module.exports = router;