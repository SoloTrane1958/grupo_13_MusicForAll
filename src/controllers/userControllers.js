const fs = require ('fs');
const path = require ('path');
const User = require('../models/User');
const bcrypt = require('bcryptjs'); 


const usersFilePath = path.join(__dirname, '../data/users.json')
const productsFilePath = path.join(__dirname, '../data/products.json');
const usersDB = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8')); 
const productsDB = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const { validationResult } = require ('express-validator'); 

const userControllers= {
    index: function(req,res, next){
        res.render('index', {
            products: productsDB
        });
    },

    create: function (req, res) {
        res.render('register'); 
    },

    processRegister: function (req,res){
        const errorsRegister = validationResult(req); 
        if (errorsRegister.errors.length > 0) {
            return res.render('register', {
                errors: errorsRegister.mapped(),
                //el metodo mapped convierte el array en un objeto literal donde cada objeto literal tiene a suvez sus propiedades. 
                oldData: req.body

            })
        }

        let userInDb = User.findByField('email',req.body.email); 

        if(userInDb){
            return res.render('register', {
                errors: {
                    email: {
                        msg: 'Este email ya esta registrado'
                    }
                },
                oldData: req.body
            }); 

        }

        let userToCreate = {
            ...req.body,
            password: bcrypt.hashSync(req.body.password, 10), 
            avatar: req.file.filename
        }

        let userCreated = User.create(userToCreate)

        return res.redirect('login')

    },

    users: function (req,res){
        res.render('users');
    }, 
  
    login: function (req,res){
        res.render('login');
    },

    processLogIn: function (req,res) {
       
        let userToLogIn = User.findByField('email', req.body.email);

        if (userToLogIn) {

            let isOkThePassword = bcrypt.compareSync(req.body.password, userToLogIn.password)

            if(isOkThePassword){
                //creo una propiedad en session que va a tener la informacion del usuario a loguearse.
                //borro la contrase??a para no matenerla en la session del usuario
                delete userToLogIn.password;
                req.session.userLogged = userToLogIn;
                
                if(req.body.remember_user){
                    res.cookie('userEmail', req.body.email, {maxAge: (1000 * 60) * 60})
                }
                return res.redirect('userProfile')
            }
            
            return res.render('login', {
                errors: {
                    email: {
                        msg: 'Las credenciales son invalidas'
                    }
                }
            })

        }

        return res.render ('login', {
            errors: {
                email: {
                    msg: 'No se encuentra este email en nuestra base de datos '
                }
            }
        })

    },

    profile: (req, res)=> {
        return res.render('userProfile', {
            user: req.session.userLogged
        });  

    },

    logout: (req, res) => {
        res.clearCookie('userEmail'); 
        req.session.destroy();
        return res.redirect('/')
    }
}


module.exports = userControllers; 