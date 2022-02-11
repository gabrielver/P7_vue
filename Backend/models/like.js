const { Sequelize, DataTypes } = require('sequelize');
const sequelize  = require('../mysql');
const Post = require('../models/Post');
const users = require('../models/User');

    const Likes = sequelize.define('likes', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      likes: {
        type: DataTypes.INTEGER,
        
      },
      dislikes: {
        type: DataTypes.INTEGER,
       
      },
   
    });

    console.log("post in likes=",Post);
    console.log("users in likes=",users);
    
    Likes.belongsToMany(model.Post, {through: 'PostLikes', foreignKey: 'PostLikesId', as: 'authors'});
  
    
    console.log("5",Likes === sequelize.models.likes), // true
    module.exports = Likes;