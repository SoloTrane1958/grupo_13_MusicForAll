let userControllers= {
    index: function(req,res, next){
        res.render('index');
    },
    detallesProductos: function(req,res, next){
        res.render('detallesProductos');
    },
    login: function (req,res){
        res.render('login');
    },
    register: function(req, res, next) {
        res.render('register.ejs')
    },
    carrito: function(req,res, next){ 
        res.render('carrito.ejs')
    }
}

module.exports = userControllers