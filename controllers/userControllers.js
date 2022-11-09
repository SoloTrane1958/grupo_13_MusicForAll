let userControllers= {
    index: function(req,res){
        res.render('index');
    },
    detallesProductos: function(req,res){
        res.render('detallesProductos');
    },
    login: function (req,res){
        res.render('login');
    },
    register: function(req, res) {
        res.render('register.ejs')
    },
    carrito: function(req,res){ 
        res.render('carrito.ejs')
    }
}

module.exports = userControllers