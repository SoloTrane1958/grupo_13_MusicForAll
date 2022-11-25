const fs = require ('fs');
const path = require ('path');

const productsFilePath = path.join(__dirname, '../data/products.json');

const productsDB = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const userControllers= {
    index: function(req,res, next){
        res.render('index', {
            products: productsDB
        });
    },
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