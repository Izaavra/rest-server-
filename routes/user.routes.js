const {Router} = require('express');
const { check, query } = require('express-validator');

const { roleValidator, emailValidator, idValidator } = require('../helpers/db-validators');

const {
    fieldsValidators,
    jwtValidator,
    adminValidator, roleAllow
} = require('../middlewares/index')


const {
    userGet, 
    userPut, 
    userPost, 
    userDelete, 
    userPath,
} = require('../controllers/user.controller');


const router = Router();

router.get('/', [
    query('from', `El valor del query 'from' debe de ser un valor numérico`)
        .if(query('from').exists()).isNumeric(),
    query('limit', `El valor del query 'limit' debe de ser un valor numérico`)
        .if(query('limit').exists()).isNumeric(),
    fieldsValidators
], userGet);

router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(idValidator),
    check('role').custom(roleValidator),
    fieldsValidators
], userPut);

router.post('/', [
    check('name', 'el nombre es obligatorio').not().isEmpty(),
    check('password', 'password no valido (minimo 6 caracteres)').isLength({min:6}),
    check('email', 'el email no es valido').isEmail(),
    check('email').custom(emailValidator),
    check('role').custom(roleValidator),
    fieldsValidators
], userPost);

router.patch('/', userPath);

router.delete('/:id', [
    jwtValidator,
    // adminValidator,
    roleAllow('ADMIN_ROLE'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(idValidator),
    fieldsValidators
], userDelete);


module.exports = router;