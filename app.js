const express = require('express');
const app = express();
app.use(express.static('public'));

app.listen(3000, ()=>{
    console.log("El servidor esta funcionando");
})

app.get("/", (req, res) =>{
    res.sendFile(__dirname + "/views/index.html");
})
app.get("/Producto", (req, res) =>{
    res.sendFile(__dirname + "/views/Detalles-Producto.html");
})

app.get("/login", (req, res) =>{
    res.sendFile(__dirname + "/views/login.html");
})