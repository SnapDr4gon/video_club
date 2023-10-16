const express = require('express');
const router = express.Router();
const controller = require('../controllers/movies');

router.post('/', controller.create); //Crear

router.get('/', controller.list); //Leer

router.get('/:id', controller.index); //leer

router.put('/:id', controller.replace); //Reemplazar

//Se pone primero para que las rutas que coincidan entren aqui
router.patch('/actor', controller.addActor);

router.patch('/:id', controller.update); //Actualizar

router.delete('/:id', controller.destroy); //Eliminar

module.exports = router;