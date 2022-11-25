const fs = require ('fs');
const path = require ('path');

const usersFilePath = path.join(__dirname, '../data/users.json')

const usersDB = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8')); 

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
        let newUser = {
            id: Date.now(), 
            firstname : req.body.firstname,
            lastname : req.body.lastname,
            username : req.body.username,
            password : req.body.password,
            email: req.body.email,
            avatar: req.file.filename, 
        }

        usersDB.push(newUser); 

        fs.writeFileSync(usersFilePath, JSON.stringify(usersDB, null, ' ')); 

        res.redirect('/index');
         
    }

    
    /* login: function (req,res){
        res.render('login');
    },
    register: function(req, res, next) {
        res.render('register')
    },
    carrito: function(req,res, next){ 
        res.render('carritoDeCompras')
    } */
}


module.exports = userControllers; 