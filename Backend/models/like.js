const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../mysql");
const Post = require("../models/Post");

const users = sequelize.define("users", {
  name: DataTypes.INTEGER,
  pseudo: DataTypes.INTEGER,
  email: DataTypes.INTEGER,
  password: DataTypes.INTEGER,
});

const Likes = sequelize.define("likes", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  postId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      // likes hasMany WorkingDays n:n
      model: Post,
      key: "id",
    },
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      // likes hasMany Users n:n
      model: users,
      key: "id",
    },
  },
});

users.belongsToMany(Post, {
  through: Likes,
  foreignKey: "userId",
  otherkey: "postId",
});

Likes.belongsTo(users, { foreignKey: "userId", as: "user" });
Likes.belongsTo(Post, { foreignKey: "postId", as: "post" });

console.log("5", Likes === sequelize.models.likes), // true
  (module.exports = Likes);
