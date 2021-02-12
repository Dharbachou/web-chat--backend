const { body } = require('express-validator');

exports.rules = (() => {
    return [
        body('firstName').notEmpty(),
        body('lastName').notEmpty(),
        body('email').notEmpty().isEmail(),
        body('password').optional().isLength({min: 5}),
        body('gender').notEmpty(),
    ]
})();