const userControllers= {
    index: function(req,res, next){
        res.render('index');
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