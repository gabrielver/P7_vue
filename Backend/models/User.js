const { Sequelize, DataTypes } = require('sequelize');
const sequelize  = require('../mysql');
const Post = require('../models/post');


const users = sequelize.define('users', {

  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  pseudo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'users',
    timestamps: false
});
 
  users.hasMany(Post, {as: 'authors'});


// `sequelize.define` also returns the model
console.log("1",users === sequelize.models.users), // true
module.exports = users;