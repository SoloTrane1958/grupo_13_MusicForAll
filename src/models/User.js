/* User va a ser una representacion de mi userDB. Para registrar un usuario necesito: 

-Guardar un usuario en la db. 
-Buscar al usuario que se quiere loguear por su email.
-Traer un usuario a traves de su ID. 
-Editar la informacion de un usuario.
-Eliminar la informacion de un usuario */

//creo un objeto literal con metodos que se van a encargar de estas carateristicas

//const usersFilePath = path.join(__dirname, '../data/users.json')

const fs = require('fs');
const path = require ('path');

const usersFilePath = path.join(__dirname, '../data/users.json')

const User = {
    //Para borrar o editar voy a tener que traer a todos los usuarios y convertir el JSON en un array de objetos literales que pueda iterar. 

    getData: function (){
        return JSON.parse (fs.readFileSync(usersFilePath, 'utf-8')); 
    },

    //Necesito un metodo que me permita generar un ID

    generateId: function(){
        //este metodo va a volver a tomar a todos los usuarios.
        let allUsers = this.findAll();
        //me interesa solo el ultimo ID entonces del array de usuarios hago un pop y obtengo el ultimo usuario y de este ultimo usuario voy a retornar su id + 1. 
        let lastUser = allUsers.pop(); 
        if(lastUser){
            return lastUser.id + 1; 
        }
        return 1; 

    },

    //Quiero implementar el metodo findAll para obtener todos los usuarios 

    findAll: function(){
        return this.getData(); 
    }, 

    //quiero ahora buscar un usuario por su ID. Esta funcion entonces va a recibir un ID

    findByPk: function (id) {
        //guardo a todos los usuarios en una variable local. Uso el metodo find de arrays que va a recibir un callback a traves del cual va a iterar todo el array de a un usuario y quiero que me retorne aquel usuario cuyo id es igual al id que pongo. 

        let allUsers = this.findAll(); 
        let userFound = allUsers.find(oneUser => oneUser.id === id);
        return userFound;  
    },

    

    //Quiero un metodo para buscar el usuario a traves de su email. El primer parametro va a ser el campo en el que quiero buscar (ej: email) y el segundo la info de acceso. )

    findByField: function (field, text) {
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUser => oneUser[field] === text);
        return userFound;
    },

    //console.log(User.findByField('email', 'mateospinelli@hotmail.com'));


    //Create recibe informacion del usuario (userData) y la va a guardar en nuestro archivo JSON que vamos a referenciar.
    create: function (userData){
        //traigo a todos los usuarios
        let allUsers = this.findAll();
        let newUser = {
            id: this.generateId(),
            ...userData
        } 
        //le hago un push a este array insertandole el user data que debe ser un objeto literal que llegue despues del formulario de registro
        allUsers.push(newUser); 
        //esto sigue siendo un array entonces tengo que convertirlo y escribirlo en el archivo json. Pongo en donde yo quiero escribir y le paso el objeto en formato JSON, para mantener el formato paso null y el formato vacio
        fs.writeFileSync(usersFilePath, JSON.stringify(allUsers, null, ' ')); 
        return true; 

    },

    //para borrar necesito una funcion que reciba algo que identifique al usuario y que devuelva todos los usuarios menos el que corresponde con el id que me entregaron (metodo filter)

    delete: function (id) {
        let allUsers = this.findAll();
        let finalUsers = allUsers.filter(oneUser => oneUser.id !== id);
        fs.writeFileSync(usersFilePath, JSON.stringify(finalUsers, null, ' ')); 
        return newUser;
    }
}

//como es un modulo lo voy a exportar y ahora lo puedo utilizar directamente en mi controlador 

module.exports = User; 

 