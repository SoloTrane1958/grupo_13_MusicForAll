// 1- Requiero express y el metodo router. 
const express = require('express');
const router = express.Router();
const path = require ('path');


// 2- Requiero mi archivo de controladores. 
const userControllers = require('../controllers/userControllers');
//requiero multer en el archivo 
const multer= require('multer');

const { body } = require('express-validator'); 

//tengo que crear dos variables que invocan diferentes metodos que ofrece multer. 
const storage= multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname, '../../public/Imagenes'))
    },
    filename: function(req,file, cb){
        cb(null, file.filename + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload= multer({
    storage
});

const validations = [
    body('email').notEmpty().isEmail().withMessage('Tienes que escribir un correo electronico'),
    body('password').notEmpty().withMessage('Tienes que escribir una contraseña')
]; 

router.get('/', userControllers.index);



// 3- necesito de rutas, una ruta que me resuelva el formulario (get).
router.get('/register', userControllers.create)
// 4- y otra ruta que me resuelva la insercion de ese usuario (post). 

router.get('/users', userControllers.users); 
//paso el nombre del input por el middleware
router.post('/users', upload.single('imagen'), userControllers.store); 

//---------

router.get('/login', userControllers.login),

//procesar el login 
router.post('/login', validations, userControllers.processLogIn),






module.exports = router; 