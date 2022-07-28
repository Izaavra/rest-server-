const {Router} = require('express');
const { check, query } = require('express-validator');
const { fieldsValidators } = require('../middlewares/fields-validator');
const router = Router();

const {
    login,
    googleSingIN
} = require('../controllers/auth.controller');

router.post('/login',[
    check('email', 'El corrreo es obligatorio').isEmail(),
    check('password', 'El contraseña es obligatoria').not().isEmpty(),
    fieldsValidators
], login);

router.post('/google',[
    check('id_token', 'id_token is required').not().isEmpty(),
    fieldsValidators
], googleSingIN);


module.exports = router;