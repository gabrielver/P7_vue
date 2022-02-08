


const { Sequelize, DataTypes } = require('sequelize');
const sequelize  = require('../mysql');


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

// `sequelize.define` also returns the model
console.log(users === sequelize.models.users); // true
module.exports = users;