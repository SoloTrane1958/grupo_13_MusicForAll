const express = require('express');
const router = express.Router();

const userControllers = require('../controllers/userControllers');
router.get('/register', userControllers.register); 

router.get('/', userControllers.index);

router.get("/detallesProducto", userControllers.detallesProductos)

router.get("/login",userControllers.login); 

router.get("/carritoDeCompras", userControllers.carrito);



module.exports = router