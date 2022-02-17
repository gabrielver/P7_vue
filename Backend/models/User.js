const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../mysql");
var validator = require("validator");
const Post = require("../models/post");
const Comment = require("../models/Comment");
const Likes = require("../models/like");
const Dislikes = require("../models/dislike");
const LikeFromCom = require("../models/likeFromCom");
const DislikeFromCom = require("../models/dislikeFromCom");

const users = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pseudo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "users",
    timestamps: false,
  }
);

users.hasMany(Post, { as: "authors" });
users.hasMany(Comment, { as: "authorsofComment" });
users.hasMany(Likes, { as: "likes" });
users.hasMany(Dislikes, { as: "dislikes" });
users.hasMany(LikeFromCom, { as: "likesfromcom" });
users.hasMany(DislikeFromCom, { as: "dislikesfromcom" });

console.log("like in user", Likes);
// `sequelize.define` also returns the model
console.log("1", users === sequelize.models.users), // true
  (module.exports = users);
