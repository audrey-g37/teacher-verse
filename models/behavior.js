const {Model, DataTypes} = require('sequelize');
const sequelize = require ("../config/connection");




class Behavior extends Model {}



Behavior.init(

{
id: {
type: DataTypes.INTEGER,
allowNull:false,
primaryKey: true,
autoIncrement: true,
},

text:{
type:DataTypes.text,
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
modelName:'Behavior',
}
);



module.exports = Behavior;