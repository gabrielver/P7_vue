const express = require("express");
const router = express.Router();
const auth = require("../middlewear/auth");
const postCtrl = require("../controllers/post");
const testCtrl = require("../controllers/test");
const multer = require("../middlewear/multer-config");

router.get("/all", auth, postCtrl.getAllPost);
router.post("/", auth, multer, postCtrl.createPost);
router.get("/:id", postCtrl.getOnePost);
router.delete("/id", postCtrl.deletePost);
router.post("/like", postCtrl.likePost);
router.get("/like/:id", postCtrl.getAllLikes);
router.post("/dislike", postCtrl.dislikePost);
router.get("/dislike/:id", postCtrl.getAllDislikes);

router.get("/test", testCtrl.test);
router.post("/testcreate", testCtrl.testcreate);

module.exports = router;
