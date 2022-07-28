const {Router} = require('express');
const { check, query } = require('express-validator');

const { 
    jwtValidator,
    fieldsValidators,
    adminValidator
} = require('../middlewares/index');

const { 
    categorieValidator,
} = require('../helpers/db-validators');

const router = Router();

const { 
    getCategories, 
    getCatById, 
    addCategorie, 
    updateCategorie, 
    deleteCategorie,
} = require('../controllers/categories.controller');

// OBTENER TODAS LAS CATEGORIAS - PUBLICO
router.get('/',[
    query('from', `El valor del query 'from' debe de ser un valor numérico`)
        .if(query('from').exists()).isNumeric(),
    query('limit', `El valor del query 'limit' debe de ser un valor numérico`)
        .if(query('limit').exists()).isNumeric(),
    fieldsValidators
], getCategories);

// OBTENER UNA CATEGORIA POR ID - PUBLICO
router.get('/:id',[
    check('id', 'No es un id Mongo valido').isMongoId(),
    check('id').custom(categorieValidator),
    fieldsValidators,
], getCatById);

// Crear categoria - privado- cualquier role con token valido
router.post('/',[
    jwtValidator,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    fieldsValidators
], addCategorie);

// actualizar - privado, cualquier role con token valido
router.put('/:id',[
    jwtValidator,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('id', 'No es un id Mongo valido').isMongoId(),
    fieldsValidators,
    check('id').custom(categorieValidator),
    fieldsValidators,
] ,updateCategorie);

// 
router.delete('/:id',[
    jwtValidator,
    adminValidator,
    check('id', 'No es un id Mongo valido').isMongoId(),
    check('id').custom(categorieValidator),
    fieldsValidators,
], deleteCategorie);


module.exports = router;