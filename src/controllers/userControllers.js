const fs = require ('fs');
const path = require ('path');


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

    users: function (req,res){
        res.render('users');
    }, 

    store: function (req, res) {
        const newusers = req.body
        newusers.id =  Number(Math.random()*100000).toFixed(0);
        newusers.firstname = req.body.firstname;
        newusers.lastname = req.body.lastname;
        newusers.username = req.body.username;
        newusers.email = req.body.email;;
        newusers.imagen = req.file.filename;

        usersDB.push(newusers); 

        fs.writeFileSync(usersFilePath, JSON.stringify(usersDB, null, ' ')); 

        res.redirect('/users');
         
    },
  
    login: function (req,res){
        res.render('login');
    },

    processLogIn: function (req,res) {
        const resultValidation = validationResult(req);
        
        if (resultValidation.errors.length > 0){
            return res.render('login', {
                errors: resultValidation.mapped()
            }); 
        }
    }


    /* register: function(req, res, next) {
        res.render('register')
    },
    carrito: function(req,res, next){ 
        res.render('carritoDeCompras')
    } */
}


module.exports = userControllers; 