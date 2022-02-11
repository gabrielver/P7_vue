const { Sequelize, DataTypes } = require('sequelize');
const sequelize  = require('../mysql');
const Post = require('../models/Post');
const Likes = require('../models/like');
const users = require('../models/User');


        const PostLikes = sequelize.define('PostLikes', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        postId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {         // User hasMany WorkingDays n:n
            model: Post,
            key: 'id'
          }
        },
        likesId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {         // WorkingDays hasMany Users n:n
            model: Likes,
            key: 'id'
          }
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      });

      console.log("likes in postlikes :",Likes);
      console.log("users in postlikes :", users);
      
        PostLikes.belongsTo(Post, {foreignKey: 'postId'});
        PostLikes.belongsTo(Likes, {foreignKey: 'likesId'});
      
    
    console.log("3",PostLikes === sequelize.models.PostLikes), // true
    module.exports = PostLikes;