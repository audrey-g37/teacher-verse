const router = require('express').Router();
const {Attendance} = require('../../models');

// Current location  "http:localhost:3001/api/attendance"

router.get('/', async (req,res) => {
try {
const attendanceData = await Attendance.findAll();
res.status(200).json(attendanceData);

}
catch(err){
res.status(500).json(err)
}
});


router.get('/:id', async (req,res) => {
try {
const attendanceData = await Attendance.findByPk(req.params.id);
if (!attendanceData) {
res.status(404).json({message:`no attendance data found with id of ${req.params.id}`});
}
res.status(200).json(attendanceData);

}
catch(err){
res.status(500).json(err)
}
});



router.post('/', async (req,res) => {
    try{
const newAttendence = await Attendance.create({
    isPresent: req.body.isPresent,
    time:req.body.time,
    
});
res.status(200).json({message:"Attendance was added!"});

    }
    catch(err){
        res.status(400).json(err)
    }
});



router.put('/:id', async (req,res) => {
    try {
const updatedAttendance = await Attendance.update(req.body, {where: {id:req.params.id}});
if (!updatedAttendance[0]) {
res.status(404).json({message:`no attendance data found with the id of ${req.params.id}`})
}
res.status(200).json({message:`Attendance with id of ${req.params.id} updated`})
    }
    catch(err){
res.status(500).json(err)
    }
})

router.delete ('/:id', async (req,res) => {
    try{
    const deletedAttendance = await Attendance.destroy({where:{id: req.params.id}});
if(!deletedAttendance){
res.status(404).json({message:`no attendence data with id ${req.params.id} found`})
}
res.status(200).json({message:`Attendance data with id ${req.params.id} deleted`})
    }
    catch(err){
    res.status(500).json(err)
    }
});



//thunder client



module.exports = router;