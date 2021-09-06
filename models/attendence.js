const {Model, DataTypes} = require('sequelize');
const sequelize = require ("../config/connection");




class Attendance extends Model {}



Attendance.init(

{
id: {
type: DataTypes.INTEGER,
allowNull:false,
primaryKey: true,
autoIncrement: true,
},

text :{
type: DataTypes.text,

},

status:{
    type:DataTypes.STRING,
    allowNull: false,
    },
    

},
{
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName:'Attendance',
    }
);



module.exports = Attendance;