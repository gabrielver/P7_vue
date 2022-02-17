const express = require("express");
const router = express.Router();

const commentCtrl = require("../controllers/comment");

router.get("/comment/all", commentCtrl.getAllComment);
router.get("/comment/all/:id", commentCtrl.getSomeComment);
router.post("/comment", commentCtrl.createComment);
router.get("/id/comment", commentCtrl.getOneComment);
router.delete("/comment/id", commentCtrl.deleteComment);
router.post("/comment/like", commentCtrl.likeComment);
router.get("/comment/like/:id", commentCtrl.getAllLikes);
router.post("/comment/dislike", commentCtrl.dislikeComment);
router.get("/comment/dislike/:id", commentCtrl.getAllDislikes);

module.exports = router;
