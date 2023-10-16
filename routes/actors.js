const express = require('express');
const router = express.Router();
const controller = require('../controllers/actors');

router.post('/', controller.create); //Crear

router.get('/', controller.list); //Leer

router.get('/:id', controller.index); //Leer

router.put('/:id', controller.replace); //Reemplazar

// Se pone antes del otr patch para que lo agarre
router.patch('/movie', controller.addMovie);

router.patch('/:id', controller.update); //Actualizar

router.delete('/:id', controller.destroy); //Eliminar

module.exports = router;