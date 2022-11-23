const express = require('express');
const router = express.Router();
const multer = require('multer');
//Requerimos el controlador
const productsController = require('../controllers/productsControllers');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,path.join(__dirname,'/public/Imagenes'));
    },
    filename: function(req,file, cb){
        cb(null,file.filename + '-' + Date.now() + path.extreme(file.originalname));
    }
  });
  const upload = multer({storage});
//Requerimos el middleware
// const productCreateValidator = require('../middlewares/productsMiddleware');


//Creamos la ruta GET /products que apunta al método index del controlador productsController
router.get('/',productsController.index);

router.get('/detail/:id?', productsController.detail);

router.get('/formcreate', productsController.formCreate);

router.post('/', /*productCreateValidator,*/ upload.single('image'),productsController.create);

router.get('/edit', productsController.edit);

router.get('/:id/edit', productsController.edit);

router.put('/:id', productsController.update);

router.get('/:id/delete', productsController.delete);

router.delete('/:id', productsController.destroy);

module.exports = router;