const asyncLib = require("async");
const Likes = require("../models/like");
const Dislikes = require("../models/dislike");
const Post = require("../models/Post");
const users = require("../models/User");
const fs = require("fs");
require("dotenv").config({ path: "./.env" });

exports.getAllPost = async (req, res, next) => {
  const post = await Post.findAll({
    include: "users",
    order: [["id", "DESC"]],
  });
  return res.status(200).json(post);
};

exports.getAllLikes = async (req, res, next) => {
  id = req.params.id;
  Likes.findAll({ where: { userId: id } }).then((likes) => {
    if (!likes) {
      console.log("Not found!");
    } else {
      res.status(200).json(likes);
    }
  });
};

exports.getAllDislikes = async (req, res, next) => {
  id = req.params.id;
  Dislikes.findAll({ where: { userId: id } }).then((dislikes) => {
    if (!dislikes) {
      console.log("Not found!");
    } else {
      res.status(200).json(dislikes);
    }
  });
};

exports.createPost = (req, res, next) => {
  delete req.body.user_id;
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      res.send(err);
    } else if (err) {
      // An unknown error occurred when uploading.
      res.send(err);
    }

    console.log(req.file);

    // Everything went fine.
  });
  const post = Post.create({
    userId: req.body.userId,
    content: req.body.content,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  })

    .then(() => res.status(201).json({ message: "Objet enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getOnePost = (req, res, next) => {
  id = req.params.id;
  Post.findOne({ include: "users", where: { id: id } })
    .then((post) => {
      if (!post) {
        return res.status(404).send(new Error("Product not found!"));
      }
      //product.imageUrl = req.protocol + '://' + req.get('host') + '/images/' + product.imageUrl;
      res.status(200).json(post);
    })
    .catch(() => {
      res.status(500).send(new Error("Database error!"));
    });
};

exports.deletePost = (req, res, next) => {
  var url = req.originalUrl;
  var postid = url.substring(url.lastIndexOf("=") + 1);
  Post.findOne({
    where: { id: postid },
  })
    .then((post) => {
      //const filename = sauce.imageUrl.split('/images/')[1];
      //fs.unlink(`images/${filename}`, () => {
      Post.destroy({
        where: { id: postid },
      })
        .then(() => res.status(200).json({ message: "deleted" }))
        .catch((error) => res.status(400).json({ error: error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.likePost = async (req, res, next) => {
  const userId = req.body.userId;
  const postId = req.body.postId;
  const mode = req.body.mode; //1 like, 0 unlike

  const post = await Post.findOne({ where: { id: postId } });
  if (post === null) {
    res.status(404).json({ message: "Post not found" });
    return;
  }

  if (mode === 1) {
    const like = await Likes.findOne({
      where: { postId: postId, userId: userId },
    });
    if (like === null) {
      post.likes += 1;
      post.save();

      Likes.create({
        postId: postId,
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
    post.likes -= 1;
    post.save();

    Likes.destroy({
      where: {
        postId: postId,
        userId: userId,
      },
    });

    res.status(200).json({ message: "unlike !" });
    return;
  }

  res.status(400).json({});
};

exports.dislikePost = async (req, res, next) => {
  const userId = req.body.userId;
  const postId = req.body.postId;
  const mode = req.body.mode; //1 dislike, 0 undislike

  const post = await Post.findOne({ where: { id: postId } });
  if (post === null) {
    res.status(404).json({ message: "Post not found" });
    return;
  }

  if (mode === 1) {
    const dislike = await Dislikes.findOne({
      where: { postId: postId, userId: userId },
    });
    if (dislike === null) {
      post.dislikes += 1;
      post.save();

      Dislikes.create({
        postId: postId,
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
    post.dislikes -= 1;
    post.save();

    Dislikes.destroy({
      where: {
        postId: postId,
        userId: userId,
      },
    });

    res.status(200).json({ message: "undislike !" });
    return;
  }

  res.status(400).json({});
};
