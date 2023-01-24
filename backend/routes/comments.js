const express = require('express');
const router = express.Router();
const multer =  require('../middleware/multer-config')

const auth = require("../middleware/auth");
const commentCtrl = require("../controllers/comments");

router.post('/:postId',auth, multer, commentCtrl.addComment);
router.put('/:id',auth, multer, commentCtrl.modifyComment);
router.get('/:postId', auth, commentCtrl.getAllComment)


router.delete('/:id',auth, commentCtrl.deleteComment)


module.exports = router;