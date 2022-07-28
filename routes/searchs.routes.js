const {Router} = require('express');

const {
    search
} = require('../controllers/searchs.controller');

const { fieldsValidators } = require('../middlewares');

const router = Router();

router.get('/:collection/:term', [
    fieldsValidators
], search);


module.exports = router;