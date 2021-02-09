const router = require('express').Router();
const { validate } = require('../validators');
const {rules: registrationValidator} = require('../validators/auth/register');
const {rules: loginValidator} = require('../validators/auth/login');
const {login, register} = require('../controllers/authController')

router.post(
    '/login',
    [
        loginValidator,
        validate
    ],
    login);
router.post(
    '/register',
    [
        registrationValidator,
        validate
    ],
    register
);

module.exports = router;