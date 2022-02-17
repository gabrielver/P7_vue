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

const Likes = sequelize.define('likes', {
  likes: DataTypes.INTEGER,
  dislikes: DataTypes.INTEGER
}, {});

const Post = sequelize.define('Post', {

  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {         // Post belongsTo users 1:1
      model: users,
      foreignKey: 'id'
    }
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false
  },
  likes: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false
  }
});

console.log("likes in post :",Likes);
console.log("users in post :", users);

   Post.belongsTo(users, {foreignKey: 'userId', as: 'users'});
   Post.belongsToMany(Likes, {through: 'PostLikes', foreignKey: 'postId', as: 'ikes'});
  


// `sequelize.define` also returns the model
console.log("2",Post === sequelize.models.Post), // true
module.exports = Post;