


const { Sequelize, DataTypes } = require('sequelize');
const sequelize  = require('../mysql');
const Post = require('../models/post');

const users = sequelize.define('users', {

  user_id: {
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

// const usersPost = sequelize.define('usersPost', {
//   usersId: {
//     type: DataTypes.INTEGER,
//     references: {
//       model: users, 
//       key: 'user_id'
//     }
//   },
//   PostId: {
//     type: DataTypes.INTEGER,
//     references: {
//       model: Post, 
//       key: 'user_id'
//     }
//   }
// });
// users.belongsToMany(Post, { through:  "usersPost" });
// Post.belongsToMany(users, { through:  "usersPost" });


// `sequelize.define` also returns the model
console.log(users === sequelize.models.users); // true
module.exports = users;