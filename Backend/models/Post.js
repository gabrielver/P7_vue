const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../mysql");
const Comment = require("../models/Comment");

const users = sequelize.define(
  "users",
  {
    name: DataTypes.INTEGER,
    pseudo: DataTypes.INTEGER,
    email: DataTypes.INTEGER,
    password: DataTypes.INTEGER,
  },
  {
    timestamps: false,
  }
);

const Post = sequelize.define("Post", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      // Post belongsTo users 1:1
      model: users,
      foreignKey: "id",
    },
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  likes: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  dislikes: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

Post.hasMany(Comment, { as: "fatherOfComment" });
Post.belongsTo(users, { foreignKey: "userId", as: "users" });
// Post.belongsToMany(Likes, {through: 'PostLikes', foreignKey: 'postId', as: 'ikes'});

console.log("2", Post === sequelize.models.Post), // true
  (module.exports = Post);
