const { body } = require('express-validator');

exports.rules = (() => {
    return [
        body('email').notEmpty().isEmail()
    ]
})();