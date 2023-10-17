const express = require('express');
const { Booking } = require('../db');

function create(req, res, next) {
    const date = req.body.date;

    Booking.create({
        date: date
    }).then(object => res.json(object))
      .catch(err => res.send(err));
}

function list(req, res, next) {
    Booking.findAll()
           .then(object => res.json(object))
           .catch(err => res.send(err));
}

function index(req, res, next) {
    const id = req.params.id;

    Booking.findByPk(id)
           .then(object => res.json(object))
           .catch(err => res.send(err));
}

function replace(req, res, next) {
    const id = req.params.id;

    Booking.findByPk(id).then(object => {
        const date = req.body.date ? req.body.date : "";

        object.update({
            date: date
        }).then(objetc => res.json(object))
          .catch(err => res.send(err));
    }).catch(err => res.send(err));
}

function update(req, res, next) {
    const id = req.params.id;

    Booking.findByPk(id).then(object => {
        const date = req.body.date ? req.body.date : "";

        object.update({
            date: date
        }).then(object => res.json(object))
          .catch(err => res.send(err));
    }).catch(err => res.send(err));
}

function destroy(req, res, next) {
    const id = req.params.id;

    Booking.destroy({ where : {id : id}})
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