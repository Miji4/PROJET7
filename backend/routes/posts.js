const express = require('express');
const router = express.Router();
const multer =  require('../middleware/multer-config')

const auth = require("../middleware/auth");
const postCtrl = require("../controllers/posts");

router.post('/',auth, multer, postCtrl.addPost);
router.put('/:id',auth, multer, postCtrl.modifyPost)
router.get('/:id',auth, postCtrl.getOnePost)
router.get('/', postCtrl.getAllPost)
router.delete('/:id',auth, postCtrl.deletePost)


module.exports = router;