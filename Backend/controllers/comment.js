const Comment = require("../models/Comment");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var asyncLib = require("async");
require("dotenv").config({ path: "./.env" });
const users = require("../models/User");
const LikeFromCom = require("../models/likeFromCom");
const DislikeFromCom = require("../models/dislikeFromCom");

exports.getAllComment = async (req, res, next) => {
  const comment = await Comment.findAll({ order: [["id", "DESC"]] });
  return res.status(200).json(comment);
};

exports.getSomeComment = async (req, res, next) => {
  id = req.params.id;
  Comment.findAll({
    where: { postId: id },
    include: "users",
    order: [["id", "DESC"]],
  }).then((Comment) => {
    if (!Comment) {
      console.log("Not found!");
    } else {
      res.status(200).json(Comment);
    }
  });
};

exports.createComment = (req, res, next) => {
  delete req.body.user_id;
  const date = new Date();
  // date.getTime();
  console.log(date);
  const comment = Comment.create({
    postId: req.body.postId,
    userId: req.body.userId,
    message: req.body.message,
    // imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  })

    .then(() => res.status(201).json({ message: "Objet enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getOneComment = (req, res, next) => {
  var url = req.originalUrl;
  var commentid = url.substring(url.lastIndexOf("=") + 1);
  console.log(commentid);
  Comment.findOne({
    where: { id: commentid },
  })
    .then((comment) => {
      if (!comment) {
        return res.status(404).send(new Error("Product not found!"));
      }
      //product.imageUrl = req.protocol + '://' + req.get('host') + '/images/' + product.imageUrl;
      res.status(200).json(comment);
    })
    .catch(() => {
      res.status(500).send(new Error("Database error!"));
    });
};

exports.deleteComment = (req, res, next) => {
  var url = req.originalUrl;
  var commentid = url.substring(url.lastIndexOf("=") + 1);
  Comment.findOne({
    where: { id: commentid },
  })
    .then((comment) => {
      //const filename = sauce.imageUrl.split('/images/')[1];
      //fs.unlink(`images/${filename}`, () => {
      Comment.destroy({
        where: { id: commentid },
      })
        .then(() => res.status(200).json({ message: "deleted" }))
        .catch((error) => res.status(400).json({ error: error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.likeComment = async (req, res, next) => {
  const userId = req.body.userId;
  const commentId = req.body.postId;
  const mode = req.body.mode; //1 like, 0 unlike

  const comment = await Comment.findOne({ where: { id: commentId } });
  if (comment === null) {
    res.status(404).json({ message: "comment not found" });
    return;
  }

  if (mode === 1) {
    const like = await LikeFromCom.findOne({
      where: { commentId: commentId, userId: userId },
    });
    if (like === null) {
      comment.likes += 1;
      comment.save();

      LikeFromCom.create({
        commentId: commentId,
        userId: userId,
      });

      res.status(200).json({ message: "like !" });
      return;
    } else {
      res.status(400).json({ message: "deja like !" });
      return;
    }
  }
  if (mode === 0) {
    comment.likes -= 1;
    comment.save();

    Likes.destroy({
      where: {
        commentId: commentId,
        userId: userId,
      },
    });

    res.status(200).json({ message: "unlike !" });
    return;
  }

  res.status(400).json({});
};

exports.dislikeComment = async (req, res, next) => {
  const userId = req.body.userId;
  const commentId = req.body.postId;
  const mode = req.body.mode; //1 like, 0 unlike

  const comment = await Comment.findOne({ where: { id: commentId } });
  if (comment === null) {
    res.status(404).json({ message: "comment not found" });
    return;
  }

  if (mode === 1) {
    const dislike = await DislikeFromCom.findOne({
      where: { commentId: commentId, userId: userId },
    });
    if (like === null) {
      comment.dislikes += 1;
      comment.save();

      DislikeFromCom.create({
        commentId: commentId,
        userId: userId,
      });

      res.status(200).json({ message: "dislike !" });
      return;
    } else {
      res.status(400).json({ message: "deja dislike !" });
      return;
    }
  }
  if (mode === 0) {
    comment.dislikes -= 1;
    comment.save();

    DislikeFromCom.destroy({
      where: {
        commentId: commentId,
        userId: userId,
      },
    });

    res.status(200).json({ message: "undislike !" });
    return;
  }

  res.status(400).json({});
};

exports.getAllLikes = async (req, res, next) => {
  id = req.params.id;
  LikeFromCom.findAll({ where: { userId: id } }).then((likes) => {
    if (!likes) {
      console.log("Not found!");
    } else {
      res.status(200).json(likes);
    }
  });
};

exports.getAllDislikes = async (req, res, next) => {
  id = req.params.id;
  DislikeFromCom.findAll({ where: { userId: id } }).then((dislikes) => {
    if (!dislikes) {
      console.log("Not found!");
    } else {
      res.status(200).json(dislikes);
    }
  });
};
