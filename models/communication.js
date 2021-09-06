const {Model, DataTypes} = require('sequelize');
const sequelize = require ("../config/connection");




class Communication extends Model {}



Communication.init(
    {

id:{
type:DataTypes.INTEGER,
allowNull:false,
primaryKey: true,
autoIncrement: true,
},

communicationMethod: {
type:DataTypes.STRING,
allowNull: false,
},

text: {
type:DataTypes.text,
allowNull:true,

}
},

{
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName:'Communication',
    }

);



module.exports = Communication;