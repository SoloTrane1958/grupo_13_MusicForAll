// 1- Requiero express y el metodo router. 
const express = require('express');
const router = express.Router();
const path = require ('path');


//Midllewares
const guestMiddleware = require ('../middlewares/guestMiddleware');
const authMiddleware = require ('../middlewares/authMiddleware')

// 2- Requiero mi archivo de controladores. 
const userControllers = require('../controllers/userControllers');
//requiero multer en el archivo 
const multer= require('multer');

const { body } = require('express-validator'); 
const { default: isEmail } = require('validator/lib/isEmail');

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
    //tengo dos validaciones para el mismo campo, si el error salto bail detiene las validaciones, si no deja pasar el resto. 
    body('email')
    .notEmpty().withMessage('Tienes que escribir un correo electronico').bail()
    .isEmail().withMessage('Debes escribir un formato de correo valido')
    ,
    body('password').isLength({min: 8}).withMessage('La contraseña debe tener al menos 8 caracteres').notEmpty().withMessage('Tienes que escribir una contraseña')
]; 

const registerValidations = [
    body('fullname').notEmpty().withMessage('Tienes que escribir un nombre'),
    body('lastname').notEmpty().withMessage('Tienes que escribir un apellido'),
    body('username').notEmpty().withMessage('Tienes que escribir un usuario'),
    body('password').notEmpty().withMessage('Tienes que escribir una contraseña'),
    body('email')
     .notEmpty().withMessage('Tienes que escribir un correo electronico').bail()
     .isEmail().withMessage('Debes escribir un formato de correo valido'), 
    body('imagen').custom((value, {req}) => {
        let file = req.file; 
        let acceptedExtensions = ['.jpg', '.png', '.gif'];
        
        if (!file) {
            throw new Error('Tenes que subir una imagen')
        } else {
            let fileExtension = path.extname(file.originalname);
            if(!acceptedExtensions.includes(fileExtension)){
                throw new Error(`las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`); 
    
            }

        }

        return true; 
    })
]

router.get('/', userControllers.index);



// 3- necesito de rutas, una ruta que me resuelva el formulario (get).
router.get('/register', guestMiddleware, userControllers.create);
router.post('/register', upload.single('imagen'), registerValidations, userControllers.processRegister); 

// 4- y otra ruta que me resuelva la insercion de ese usuario (post). 

router.get('/users', userControllers.users); 
//paso el nombre del input por el middleware
//router.post('/users', upload.single('imagen'), userControllers.store); 

router.get('/login', guestMiddleware, userControllers.login),

router.get('/userProfile', authMiddleware, userControllers.profile), 

//procesar el login 
router.post('/login', validations, userControllers.processLogIn),

router.get('/logout', userControllers.logout) 






module.exports = router; 