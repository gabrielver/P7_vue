const { Sequelize, DataTypes } = require('sequelize');
const sequelize  = require('../mysql');


const Post = sequelize.define('Post', {

  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
  updatedAt: {
    type: DataTypes.NUMBER,
    allowNull: false
  }
  
});

// `sequelize.define` also returns the model
console.log(Post === sequelize.models.Post); // true
module.exports = Post;