const userControllers = {
    index: function(req,res, next){
        res.render('index');
    },
    detallesProductos: function(req,res, next){
        res.render('detallesProducto');
    },
    login: function (req,res, next){
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