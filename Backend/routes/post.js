const express = require('express');
const router = express.Router();
const auth = require('../middlewear/auth');
const postCtrl = require('../controllers/post');
const testCtrl = require('../controllers/test');

router.get('/all', postCtrl.getAllPost)
router.post('/', postCtrl.createPost)
router.get('/id', postCtrl.getOnePost)
router.delete('/id', postCtrl.deletePost)

router.get('/test', testCtrl.test)
router.post('/testcreate', testCtrl.testcreate)

module.exports = router;