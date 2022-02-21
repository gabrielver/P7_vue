const express = require("express");
const router = express.Router();
const auth = require("../middlewear/auth");
const postCtrl = require("../controllers/post");

const multer = require("../middlewear/multer-config");

router.get("/all", auth, postCtrl.getAllPost);
router.post("/", auth, multer, postCtrl.createPost);
router.get("/:id", auth, postCtrl.getOnePost);
router.delete("/:id", auth, postCtrl.deletePost);

router.post("/like", auth, postCtrl.likePost);
router.get("/like/:id", auth, postCtrl.getAllLikes);
router.post("/dislike", auth, postCtrl.dislikePost);
router.get("/dislike/:id", auth, postCtrl.getAllDislikes);

module.exports = router;
