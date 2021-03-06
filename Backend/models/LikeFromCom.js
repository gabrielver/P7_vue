const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../mysql");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

const users = sequelize.define("users", {
  name: DataTypes.INTEGER,
  pseudo: DataTypes.INTEGER,
  email: DataTypes.INTEGER,
  password: DataTypes.INTEGER,
});

const LikeFromCom = sequelize.define("likesfromcom", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  commentId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      // LikeFromCom hasMany comment n:n
      model: Comment,
      key: "id",
    },
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      // LikeFromCom hasMany Users n:n
      model: users,
      key: "id",
    },
  },
});

users.belongsToMany(Comment, {
  through: LikeFromCom,
  foreignKey: "userId",
  otherkey: "commentId",
});

LikeFromCom.belongsTo(users, { foreignKey: "userId", as: "user" });
LikeFromCom.belongsTo(Comment, { foreignKey: "commentId", as: "comment" });

module.exports = LikeFromCom;
