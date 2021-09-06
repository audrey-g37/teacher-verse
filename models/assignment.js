const {Model, DataTypes} = require('sequelize');
const sequelize = require ("../config/connection");




class Assignments extends Model {}


Assignments.init(

{

id: {
type: DataTypes.INTEGER,
autoIncrement: true,
allowNull:false,
primaryKey:true,
},

title: {
type:DataTypes.STRING(30),
allowNull:false,
},

description: {
    type:DataTypes.TEXT,
    allowNull: true,
},

feedback : {
type: DataTypes.STRING,
allowNull: false,
},

dueDate: {
type: DataTypes.DATE,
allowNull: false,
},

status: {
    type:DataTypes.STRING,
    allowNull: false,
},

scoreEarned: {
    type:DataTypes.DECIMAL,
    allowNull: true,
},
},

{
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName:'Assignments',
},


);




module.exports = Assignments;