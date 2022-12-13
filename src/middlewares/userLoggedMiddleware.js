function userLoggedMiddleware(req, res, next){
    res.locals.isLogged = false; 

    if (req.session && req.session.userLogged){
        res.locals.isLogged = true; 
        //como no estoy rendeerizando una vista sino que paso variables locales que se comparten entre muchas vistas yo paso ahora lo que tengo en session a una variable local. 
        res.locals.userLogged = req.session.userLogged; 
    }

    next();

}

module.exports = userLoggedMiddleware; 