const router = require('express').Router();
const {Student,Teacher, Assignment, AssignmentFeedback, Attendance, Behavior, Communication, Guardian, StudentAssignmentFeedback, StudentAttendance,StudentBehavior,StudentCommunication} = require('../../models');

// Current location  "http:localhost:3001/api/student"

router.get('/', async (req,res) => {
try {
const studentData = await Student.findAll({include:[{model:Teacher},{model:AssignmentFeedback}, {model:Attendance}, {model:Behavior},{model:Communication},{model:Guardian}]});
res.status(200).json(studentData);

}
catch(err){
res.status(500).json(err)
}
});


router.get('/:id', async (req,res) => {
try {
const studentData = await Student.findByPk(req.params.id);
if (!studentData) {
res.status(404).json({message:`no Student found with id of ${req.params.id}`});
}
res.status(200).json(studentData);

}
catch(err){
res.status(500).json(err)
}
});



router.post('/', async (req,res) => {
    try{
const newStudent = await Student.create(req.body);
res.status(200).json({message:"Student Created!"});
}
    catch(err){
        res.status(400).json(err)
    }
});



router.put('/:id', async (req,res) => {
    try {
const updatedStudent = await Student.update(req.body, {where: {id:req.params.id}});
if (!updatedStudent[0]) {
res.status(404).json({message:`no Student found with the id of ${req.params.id}`})
}
res.status(200).json({message:`Student with id of ${req.params.id} updated`})
    }
    catch(err){
res.status(500).json(err)
    }
})

router.delete ('/:id', async (req,res) => {
    try{
    const deletedStudent = await Student.destroy({where:{id: req.params.id}});
if(!deletedStudent){
res.status(404).json({message:`no Student with id ${req.params.id} found`})
}
res.status(200).json({message:`Student with id ${req.params.id} deleted`})
    }
    catch(err){
    res.status(500).json(err)
    }
});



//thunder client



module.exports = router;