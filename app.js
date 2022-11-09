const express = require('express');
const app = express();
const path = require('path');

app.listen(3000, ()=>{
    console.log("El servidor esta funcionando");
});
const userRoutes = require('./routes/user');


app.use('/', userRoutes);
app.use(express.static('public'))
app.use('views', path.join(__dirname, '/views'));

app.set('view engine', 'ejs');



module.exports = app;