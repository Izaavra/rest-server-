const {Router} = require('express');

const { check, query } = require('express-validator');
const { productValidator, idValidator, categorieValidator } = require('../helpers/db-validators');

const { 
    jwtValidator,
    fieldsValidators,
    adminValidator,
} = require('../middlewares/index');

const {
    getProduct,
    getProductById,
    newProduct,
    updateProduct,
    deleteProduct
} = require('./../controllers/products.controller')

const router = Router();

router.post('/', [
    jwtValidator,
    check('categorie', 'no es un id de mongo valido').isMongoId(),
    check('categorie', 'la categoria no existe').custom(categorieValidator),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('price', `El precio tiene que ser 'Number'`).isNumeric(),
    fieldsValidators,
], newProduct);

router.get('/', [
    query('limit', `El valor del query 'limit' debe de ser un valor numérico`)
        .if(query('limit').exists()).isNumeric(),
    fieldsValidators
], getProduct);

router.get('/:id', [
    check('id', 'No es un id Mongo valido').isMongoId(),
    check('id').custom(productValidator),
    fieldsValidators
], getProductById);

router.put('/:id', [
    jwtValidator,
    // check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('id', 'No es un id Mongo valido').isMongoId(),
    check('id').custom(productValidator),
    fieldsValidators,
], updateProduct);

router.delete('/:id', [
    jwtValidator,
    adminValidator,
    check('id', 'No es un id Mongo valido').isMongoId(),
    check('id').custom(productValidator),
    fieldsValidators,
], deleteProduct);

module.exports = router;