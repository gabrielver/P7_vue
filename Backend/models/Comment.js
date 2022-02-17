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
const Post = sequelize.define('Post', {
  userId: DataTypes.STRING,
  content: DataTypes.STRING,
  likes: DataTypes.INTEGER,
  dislikes: DataTypes.INTEGER
});

const Comment = sequelize.define('Comment', {

  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  postId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {         // comment belongsTo users 1:1
      model: Post,
      foreignKey: 'id'
    }
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {         // comment belongsTo users 1:1
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

});
console.log('post=', Post)
Comment.belongsTo(users, {foreignKey: 'userId', as: 'users'});
Comment.belongsTo(Post, {foreignKey: 'postId', as: 'post'});

// `sequelize.define` also returns the model
console.log("4",Comment === sequelize.models.Comment); // true
module.exports = Comment;