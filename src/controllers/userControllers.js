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
            /* password: bcrypt.hashSync(req.body.password, 10), */
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
        const resultValidation = validationResult(req);
        
        if (resultValidation.errors.length > 0){
            return res.render('login', {
                errors: resultValidation.mapped(),
                oldData: req.body

            }); 

        } else {

            for (let i=0; i < usersDB.length; i++) {
                if (usersDB[i].email == req.body.email){
                    if (bcrypt.compareSync(req.body.password, usersDB[i].password)){
                        let usuarioALoguearse = usersDB[i];
                        break; 
                    }
                }
    
                if (usuarioALoguearse == undefined) {
                    return res.render ('login', {errors: [
                        {msg: 'Credenciales invalidas'}
                    ]});
                }
    
                req.session.usuarioLogueado = usuarioALoguearse;
                res.render('/'); 
    
            }
            
        }
    }
}


module.exports = userControllers; 