const express = require('express');
const router = express.Router();

//Requerimos el controlador
const productsController = require('../controllers/productsControllers');

//Requerimos el middleware
// const productCreateValidator = require('../middlewares/productsMiddleware');


//Creamos la ruta GET /products que apunta al método index del controlador productsController
router.get('/',productsController.index);

router.get('/detail/:id?', productsController.detail);

router.get('/formcreate', productsController.formCreate);

// router.post('/', /*productCreateValidator,*/ productsController.create);

// router.get('/edit', productsController.edit);

// // router.get('/:id/edit', productsController.edit);

// router.put('/:id', productsController.update);

// // router.get('/:id/delete', productsController.delete);

// router.delete('/:id', productsController.destroy);

module.exports = router;