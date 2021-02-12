const router = require('express').Router();
const { validate } = require('../validators');
const {rules: userValidator} = require('../validators/user/update');
const {update} = require('../controllers/userController');
const {auth} = require('../middleware/auth');
const {userFile} = require('../middleware/fileUpload')

router.post(
    '/update',
    [auth, userFile,  userValidator, validate],
    update);

module.exports = router;