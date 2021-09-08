const router = require('express').Router();
const assignmentRoutes = require('./assignment-routes');






router.use('/assignment', assignmentRoutes);






module.exports = router;