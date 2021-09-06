const {Model, DataTypes} = require('sequelize');
const sequelize = require ("../config/connection");




class Comments extends Model {}



Comments.init(

{
id: {
type: DataTypes.INTEGER,
allowNull:false,
primaryKey: true,
autoIncrement: true,
},

text :{
type: DataTypes.text,
allowNull: true,
},

},

{
sequelize,
freezeTableName: true,
underscored: true,
modelName:'Comments',
}
);



module.exports = Comments;
