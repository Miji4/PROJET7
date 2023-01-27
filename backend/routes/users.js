const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const userCtrl = require("../controllers/users");
const multer =  require('../middleware/multer-config')

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/:id',auth, userCtrl.getOneUser)
router.get('/',auth, userCtrl.getAllUser)
router.put('/:id',auth, userCtrl.modifyCompte)
router.get('/utilisateurs', auth,userCtrl.getAllUser)

router.put('/isAdmin/:id', auth, userCtrl.updateRole)
router.delete('/:id',auth, userCtrl.deleteCompte)



module.exports = router;