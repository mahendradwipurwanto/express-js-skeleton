const {body } = require('express-validator');

const rule =  [
    body('username', 'Nama harus diisi').notEmpty(),
    body('email', 'Email harus diisi').notEmpty(),
    body('password', 'Password harus diisi').notEmpty()
]

module.exports = {
    rule,
};
