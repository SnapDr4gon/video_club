const express = require('express');
const { Copie } = require('../db');

function create(req, res, next) {
    const number = req.body.number;
    const format = req.body.format;
    const estatus = req.body.estatus;

    Copie.create({
        number: number,
        format: format,
        estatus: estatus
    }).then(object => res.json(object))
      .catch(err => res.send(err));
}

function list(req, res, next) {
    Copie.findAll()
           .then(object => res.json(object))
           .catch(err => res.send(err));
}

function index(req, res, next) {
    const id = req.params.id;

    Copie.findByPk(id)
         .then(object => res.json(object))
         .catch(err => res.send(err));
}

function replace(req, res, next) {
    const id = req.params.id;

    Copie.findByPk(id).then(object => {
        const number = req.body.number ? req.body.number : "";
        const format = req.body.format ? req.body.format : "";
        const estatus = req.body.estatus ? req.body.estatus: "";

        object.update({
            number: number,
            format: format,
            estatus: estatus
        }).then(object => res.json(object))
          .catch(err => res.send(err));
    }).catch(err => res.send(err));
}

function update(req, res, next) {
    const id = req.params.id;

    Copie.findByPk(id).then(object => {
        const number = req.body.number ? req.body.number : object.number;
        const format = req.body.format ? req.body.format : object.format;
        const estatus = req.body.estatus ? req.body.estatus : object.status;

        object.update({
            number: number,
            format: format,
            estatus: estatus
        }).then(object => res.json(object))
          .catch(err => res.send(err));
    }).catch(err => res.send(err));
}

function destroy(req, res, next) {
    const id = req.params.id;

    Copie.destroy({ where : {id : id}})
         .then(object => res.json(object))
         .catch(err => res.send(err));
}

module.exports = {
    create,
    list,
    index,
    replace,
    update,
    destroy
}