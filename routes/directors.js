const express = require('express');
const router = express.Router();
const controller = require('../controllers/directors');

router.post('/', controller.create); //Crear

// El mismo metodo de list pero con paginacion, se usa el "?" porque :page es opcional
router.get('/list/:page?', controller.list); //Leer

router.get('/:id', controller.index);

router.put('/:id', controller.replace); //Reemplazar

router.patch('/:id', controller.update); //Actualizar

router.delete('/:id', controller.destroy); //Eliminar

module.exports = router;