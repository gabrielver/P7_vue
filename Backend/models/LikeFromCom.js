const { Sequelize, DataTypes } = require('sequelize');
const sequelize  = require('../mysql');
const Post = require('../models/Post');


const users = sequelize.define('users', {
  name: DataTypes.INTEGER,
  pseudo: DataTypes.INTEGER,
  email: DataTypes.INTEGER,
  password: DataTypes.INTEGER
})


const LikeFromCom = sequelize.define('LikeFromCom', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      postId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {         // LikeFromCom hasMany WorkingDays n:n
          model: Post,
          key: 'id'
        }
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {         // LikeFromCom hasMany Users n:n
          model: users,
          key: 'id'
        }
    }
  });

    
    users.belongsToMany(Post, { through: LikeFromCom, foreignKey: 'userId', otherkey: "postId"});
    
    LikeFromCom.belongsTo(users, { foreignKey: 'userId', as: "user"});
    LikeFromCom.belongsTo(Post, { foreignKey: 'postId', as: "post"});
  
    
    console.log("5",LikeFromCom === sequelize.models.LikeFromCom), // true
    module.exports = LikeFromCom;