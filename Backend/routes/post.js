const express = require('express');
const router = express.Router();
const auth = require('../middlewear/auth');
const postCtrl = require('../controllers/post');

router.get('/all', postCtrl.getAllPost)
router.post('/', postCtrl.createPost)
router.get('/id', postCtrl.getOnePost)
router.delete('/id', postCtrl.deletePost)

module.exports = router;