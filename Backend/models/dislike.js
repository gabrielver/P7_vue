const { Sequelize, DataTypes } = require('sequelize');
const sequelize  = require('../mysql');
const Post = require('../models/Post');


const users = sequelize.define('users', {
  name: DataTypes.INTEGER,
  pseudo: DataTypes.INTEGER,
  email: DataTypes.INTEGER,
  password: DataTypes.INTEGER
})


    const Dislikes = sequelize.define('dislikes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      postId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {         // dislike hasMany post n:n
          model: Post,
          key: 'id'
        }
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {         // dislike hasMany Users n:n
          model: users,
          key: 'id'
        }
    }
  });

    console.log("post in dislikes=",Post);
    console.log("users in dislikes=",users);
    
    users.belongsToMany(Post, { through: Dislikes, foreignKey: 'userId', otherkey: "postId"});
   
    Dislikes.belongsTo(users, { foreignKey: 'userId', as: "user"});
    Dislikes.belongsTo(Post, { foreignKey: 'postId', as: "post"});
  
    
    console.log("6",Dislikes === sequelize.models.dislikes), // true
    module.exports = Dislikes;