const express = require("express");
const router = express.Router();
const auth = require("../middlewear/auth");
const commentCtrl = require("../controllers/comment");

router.get("/comment/all", auth, commentCtrl.getAllComment);
router.get("/comment/all/:id", auth, commentCtrl.getSomeComment);
router.post("/comment", auth, commentCtrl.createComment);
router.get("/id/comment", auth, commentCtrl.getOneComment);
router.delete("/comment/:id", auth, commentCtrl.deleteComment);
router.post("/comment/like", auth, commentCtrl.likeComment);
router.get("/comment/like/:id", auth, commentCtrl.getAllLikes);
router.post("/comment/dislike", auth, commentCtrl.dislikeComment);
router.get("/comment/dislike/:id", auth, commentCtrl.getAllDislikes);

module.exports = router;
