const router = require('express').Router();
const { validate } = require('../validators');
const {rules: userValidator} = require('../validators/user/update');
const {update, search} = require('../controllers/userController');
const {auth} = require('../middleware/auth');
const {userFile} = require('../middleware/fileUpload')

router.post(
    '/update',
    [auth, userFile,  userValidator, validate],
    update
);

router.get(
    '/search-users',
    auth,
    search
);

module.exports = router;