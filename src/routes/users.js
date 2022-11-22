const express = require('express');
const router = express.Router();

const userControllers = require('../controllers/userControllers');

router.get('/', userControllers.index);

router.get('/register', userControllers.register); 

router.get("/login",userControllers.login); 

router.get("/carritodecompras", userControllers.carrito);

module.exports = router