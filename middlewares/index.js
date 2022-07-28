const fieldsValidators  = require('./fields-validator');
const jwtValidators  = require('../middlewares/jwt-validator');
const rolesValidators  = require('../middlewares/role-validator');
const fileValidators  = require('../middlewares/file-validator');

module.exports={
    ...fieldsValidators,
    ...jwtValidators,
    ...rolesValidators,
    ...fileValidators,
}