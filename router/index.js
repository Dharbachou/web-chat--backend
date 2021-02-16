const router = require('express').Router();

const auth = require('./auth');
const user = require('./user');
const chat = require('./chat');

router.use('/', auth);
router.use('/users', user);
router.use('/chats', chat);

module.exports = router;