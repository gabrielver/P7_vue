const { Sequelize, DataTypes } = require('sequelize');
const sequelize  = require('../mysql');


const users = sequelize.define('users', {
  name: DataTypes.INTEGER,
  pseudo: DataTypes.INTEGER,
  email: DataTypes.INTEGER,
  password: DataTypes.INTEGER
}, {
  timestamps: false
});

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
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {         // Post belongsTo users 1:1
      model: users,
      foreignKey: 'id'
    }
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

Comment.belongsTo(users, {foreignKey: 'userId', as: 'users'});

// `sequelize.define` also returns the model
console.log("4",Comment === sequelize.models.Comment); // true
module.exports = Comment;