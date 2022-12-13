const User = require('../models/User'); 


function userLoggedMiddleware(req, res, next){
    res.locals.isLogged = false; 

    let emailInCookie = req.cookies.userEmail; 
    let userFromCookie = User.findByField('email', emailInCookie); 

    if(userFromCookie){
        req.session.userLogged = userFromCookie; 
    }

    if (req.session && req.session.userLogged){
        res.locals.isLogged = true; 
        //como no estoy rendeerizando una vista sino que paso variables locales que se comparten entre muchas vistas yo paso ahora lo que tengo en session a una variable local. 
        res.locals.userLogged = req.session.userLogged; 
    }


    next();

}

module.exports = userLoggedMiddleware; 