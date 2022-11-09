const express = require('express');
const app = express();
const path = require('path');
const userRoutes = require('./routes/user');

app.listen(3000, ()=>{
    console.log("El servidor esta funcionando");
});

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, '/views'));

app.use('/user', userRoutes);


module.exports = app;