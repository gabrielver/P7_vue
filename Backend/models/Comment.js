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
    allowNull: false
  },
  dislikes: {
    type: DataTypes.STRING,
    allowNull: false
  },
  usersLiked: {
    type: DataTypes.STRING,
    allowNull: false
  },
  usersDisliked: {
    type: DataTypes.STRING,
    allowNull: false
  }

});

// `sequelize.define` also returns the model
console.log(Comment === sequelize.models.Comment); // true
module.exports = Comment;