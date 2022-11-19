const userControllers= {
    index: function(req,res, next){
        res.render('index');
    },
    detallesProductos: function(req,res, next){
        res.render('producto');
    },
    login: function (req,res){
        res.render('login');
    },
    register: function(req, res, next) {
        res.render('register')
    },
    carrito: function(req,res, next){ 
        res.render('carritoDeCompras')
    },
    vender: function(req,res, next){ 
        res.render('venderProducto')
    },
    edicion: function(req,res, next){ 
        res.render('editarProducto')
    }
}

module.exports = userControllers