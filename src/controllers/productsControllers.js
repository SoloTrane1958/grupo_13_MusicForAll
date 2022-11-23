//Requerimos el módulo fs para poder leer el archivo JSON
const fs = require('fs');
//Requerimos el módulo path para poder acceder a la ruta del archivo JSON
const path = require('path');

const {
    validationResult
} = require('express-validator');

//Obtenemos la ruta del archivo JSON
const productsFilePath = path.join(__dirname, '../data/products.json');

const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
//Creamos un objeto literal que contendrá los métodos del controlador
const productsController = {
    //Método index que se encarga de obtener todos los productos y mostrarlos en la vista
    index: (req, res) => {
        //Renderizamos la vista products y le pasamos la información de los productos
        res.render('products', { products });
    },
    //Método detail que se encarga de obtener el detalle de un producto y mostrarlo en la vista
    detail: (req, res) => {
        //Obtenemos el id del producto que queremos mostrar
        const id = req.params.id;
        //Buscamos el producto que coincida con el id
        const product = products.find(product => product.id == id);
        //Renderizamos la vista productDetail y le pasamos la información del producto
        res.render('detallesProducto', { product });
    },
    formCreate: (req, res) => {
        //Renderizamos la vista productCreate
        res.render('crearProducto');
    },
    //Método store que se encarga de recibir los datos del formulario y crear un nuevo producto
    create: (req, res) => {
        //Obtenemos los datos del formulario
        //Creamos un nuevo producto 
        const product = req.body;
        product.id =  Number(Math.random()*100000).toFixed(0);
        product.name = req.body.name;
        product.descripcion = req.body.descripcion;
        product.categoria = req.body.categoria;
        product.price = Number(req.body.price);
        product.color = req.body.color;
        product.image = req.body.image;
       

        //Validamos los datos del formulario
        const errors = validationResult(req);
        //Si hay errores, redirigimos al usuario al formulario de creación de productos con los errores
        if (!errors.isEmpty()) {
            return res.render('crearProducto', {
                errors: errors.mapped(),
                oldData: req.body
            });
        }
        //Agregamos el nuevo producto al array de productos
        products.push(product);
        //Escribimos el nuevo array de productos en el archivo JSON
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
        //Redirigimos al usuario a la lista de productos
        res.redirect('/products');
    },
    edit: (req, res) => {
        //Obtenemos el id del producto que queremos editar
        const id = req.params.id;
        //Buscamos el producto que queremos editar
        const product = products.find(product => product.id == id);
        //Renderizamos la vista productEdit
        res.render('editarProducto', { product });
    },
    update: (req, res) => {
        //Obtenemos el id del producto que queremos editar
        const id = req.params.id;
        //Buscamos el producto que queremos editar
        const product = products.find(product => product.id == id);
        //Actualizamos los datos del producto
        product.name = req.body.name;
        product.description = req.body.description;
        product.price = req.body.price;
        //Escribimos el nuevo array de productos en el archivo JSON
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
        //Redirigimos al usuario a la lista de productos
        res.redirect('/products');
    },
    delete: (req, res) => {
        //Obtenemos el id del producto que queremos eliminar
        const id = req.params.id;
        //Buscamos el producto que queremos eliminar
        const product = products.find(product => product.id == id);
        //Renderizamos la vista productDelete
        res.render('productDelete', { product });
    },
    destroy: (req, res) => {
        //Obtenemos el id del producto que queremos eliminar
        const id = req.params.id;
        //Buscamos el producto que queremos eliminar
        const product = products.find(product => product.id == id);
        //Obtenemos el índice del producto que queremos eliminar
        const index = products.indexOf(product);
        //Eliminamos el producto del array
        products.splice(index, 1);
        //Escribimos el nuevo array de productos en el archivo JSON
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
        //Redirigimos al usuario a la lista de productos
        res.redirect('/products');
    }
}

module.exports = productsController;