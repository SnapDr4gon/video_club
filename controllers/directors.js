const express = require('express');
const { Director } = require('../db');

//post
function create(req, res, next) {
    const name = req.body.name;
    const lastName = req.body.lastName;

    Director.create({
        name: name,
        lastName: lastName
    }).then(object => res.json(object))
      .catch(err => res.send(err));
}

//get
function list(req, res, next) {
    Director.findAll()
            .then(object => res.json(object))
            .catch(err => res.send(err));
} 

//get
function index(req, res, next) {
    const id = req.params.id;

    Director.findByPk(id)
            .then(object => res.json(object))
            .catch(err => res.send(err));
}

//put
function replace(req, res, next) {
    const id = req.params.id;

    Director.findByPk(id).then(object => {
        const name = req.body.name ? req.body.name : "";
        const lastName = req.body.lastName ? req.body.lastName : "";

        object.update({
            name: name,
            lastName: lastName
        }).then(obj => res.json(obj))
          .catch(err => res.send(err));
    }).catch(err => res.send(err));
}

//patch
function update(req, res, next) {
    const id = req.params.id;

    Director.findByPk(id).then(object => {
        const name = req.body.name ? req.body.name : object.name;
        const lastName = req.body.lastName ? req.body.lastName : object.lastName;

        object.update({
            name: name,
            lastName: lastName
        }).then(obj => res.json(obj))
          .catch(err => res.send(err));
    }).catch(err => res.send(err));  
}

//delete
function destroy(req, res, next) {
    const id = req.params.id;

    Director.destroy({ where: { id: id }})
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