const router = require ('express').Router();
const apiRoutes= require('./api')

router.use('/api',apiRoutes);
router.use((req,res) => {
 res.status(403).json({message:"You dont have access to this page"}) //connecting to handlebars "Catherine"
});




module.exports = router;