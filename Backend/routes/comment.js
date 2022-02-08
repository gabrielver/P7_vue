const express = require('express');
const router = express.Router();

const commentCtrl = require('../controllers/comment');

router.get('/comment/all', commentCtrl.getAllComment)
router.post('/comment', commentCtrl.createComment)
router.get('/id/comment', commentCtrl.getOneComment)
router.delete('/comment/id', commentCtrl.deleteComment)
router.post('/id/comment/like', commentCtrl.likeComment)


module.exports = router;