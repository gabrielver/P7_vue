const { Sequelize, DataTypes } = require('sequelize');
const sequelize  = require('../mysql');


const Comment = sequelize.define('Comment', {

  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  post_id: {
    type: DataTypes.STRING,
    allowNull: false
  },
  user_id: {
    type: DataTypes.STRING,
    allowNull: false
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false
  },
  likes: {
    type: DataTypes.STRING,
   
  },
  dislikes: {
    type: DataTypes.STRING,
 
  },
  usersLiked: {
    type: DataTypes.STRING,
    
  },
  usersDisliked: {
    type: DataTypes.STRING,
    
  }

});

// `sequelize.define` also returns the model
console.log("4",Comment === sequelize.models.Comment); // true
module.exports = Comment;