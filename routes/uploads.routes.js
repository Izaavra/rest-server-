const {Router} = require('express');
const { check } = require('express-validator');

const {
    uploadFiles, 
    imageUpdate,
    getImgId,  
    imageUpdateCloudinary
} = require('../controllers/uploads.controller');

const { allowCollections } = require('../helpers/db-validators');
const { fieldsValidators, fileValidatorUp } = require('../middlewares');

const router = Router();

router.post('/', [
    fileValidatorUp,
    fieldsValidators
], uploadFiles);

router.put('/:collection/:id', [
    fileValidatorUp,
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('collection').custom(c => allowCollections(c, ['users', 'products'])),
    fieldsValidators
], imageUpdateCloudinary);

router.get('/:collection/:id', [
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('collection').custom(c => allowCollections(c, ['users', 'products'])),
    fieldsValidators,
], getImgId)


module.exports = router;