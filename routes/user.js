const express = require('express');
const router = express.Router();

const userControllers = require('../controllers/userControllers.js');
router.get('/', userControllers.register); 

router.get('/', userControllers.index);

router.get("/", userControllers.detallesProductos)

router.get("/",userControllers.login); 

router.get("/", userControllers.carrito);



module.exports = router