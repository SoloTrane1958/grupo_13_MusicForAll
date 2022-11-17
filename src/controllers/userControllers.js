const userControllers= {
    index: function(req,res, next){
        res.render('index');
    },
    detallesProducto: function(req,res, next){
        res.render('detallesProducto');
    },
    login: function (req,res){
        res.render('login');
    },
    register: function(req, res, next) {
        res.render('register')
    },
    carrito: function(req,res, next){ 
        res.render('carritoDeCompras')
    }
}

module.exports = userControllers