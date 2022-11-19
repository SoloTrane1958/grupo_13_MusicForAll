const express = require('express');
const router = express.Router();

const userControllers = require('../controllers/userControllers');

router.get('/', userControllers.index);
router.get('/register', userControllers.register); 


router.get("/producto", userControllers.detallesProductos)

router.get("/login",userControllers.login); 

router.get("/carritoDeCompras", userControllers.carrito);

router.get("/venderProducto", userControllers.vender);

router.get("/editarProducto", userControllers.edicion);


module.exports = router