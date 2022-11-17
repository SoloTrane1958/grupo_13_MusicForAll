const express = require('express');
const router = express.Router();

const userControllers = require('../controllers/userControllers');

router.get('/', userControllers.index);
router.get('/register', userControllers.register); 


router.get("/detallesProducto", userControllers.detallesProducto)

router.get("/login",userControllers.login); 

router.get("/carritoDeCompras", userControllers.carrito);


module.exports = router