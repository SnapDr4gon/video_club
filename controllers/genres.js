const express = require('express');
const { Genre } = require('../db');

//post
function create(req, res, next) {
    const description = req.body.description;
    const status = req.body.status;

    Genre.create({
        description: description,
        status: status
    }).then(object => res.json(object))
      .catch(err => res.send(err));
}

//get
function list(req, res, next) {
    Genre.findAll()
         .then(object => res.json(object))
         .catch(err => res.send(err));
}

//get
function index(req, res, next) {
    const id = req.params.id;

    Genre.findByPk(id)
         .then(object => res.json(object))
         .catch(err => res.send(err));
}

//put
function replace(req, res, next) {
    const id = req.params.id;

    Genre.findByPk(id).then(object => {
        const description = req.body.description ? req.body.description : "";
        const status = req.body.status ? req.body.status : "";

        object.update({
            description: description,
            status: status
        }).then(object => res.json(object))
          .catch(err => res.send(err));
    }).catch(err => res.send(err));
}

//patch
function update(req, res, next) {
    const id = req.params.id;

    Genre.findByPk(id).then(object => {
        const description = req.body.description ? req.body.description : object.description;
        const status = req.body.status ? req.body.status : object.status;

        object.update({
            description: description,
            status: status
        }).then(object => res.json(object))
          .catch(err => res.send(err));
    }).catch(err => res.send(err));
}

//delete
function destroy(req, res, next) {
    const id = req.params.id;

    Genre.destroy({ where: {id : id} })
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