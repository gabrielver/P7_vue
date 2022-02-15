const { Sequelize, DataTypes } = require('sequelize');
const sequelize  = require('../mysql');
const Post = require('../models/Post');
const users = require('../models/User');

    const Likes = sequelize.define('likes', {
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
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {         // WorkingDays hasMany Users n:n
          model: users,
          key: 'id'
        }
    }
  });

    console.log("post in likes=",Post);
    console.log("users in likes=",users);
    
    users.belongsToMany(Post, { through: Likes, foreignKey: 'userId', otherkey: "postId"});
    Post.belongsToMany(users, { through: Likes, foreignKey: 'postId', otherkey: "userId"});
    Likes.belongsTo(users, { foreignKey: 'userId', as: "user"});
    Likes.belongsTo(Post, { foreignKey: 'postId', as: "post"});
  
    
    console.log("5",Likes === sequelize.models.likes), // true
    module.exports = Likes;