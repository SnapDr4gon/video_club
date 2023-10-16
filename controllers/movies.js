const express = require('express');
const { Movie, Actor } = require('../db');

//post
function create(req, res, next) {
    const title = req.body.title;
    const genreId = req.body.genreId;
    const directorId = req.body.directorId;

    Movie.create({
        title: title,
        genreId: genreId,
        directorId: directorId
    }).then(object => res.json(object))
      .catch(err => res.send(err));
}

//get
function list(req, res, next) {
    Movie.findAll({ include: ['genre', 'director', 'actors'] })
         .then(object => res.json(object))
         .catch(err => res.json(err));
}

//get
function index(req, res, next) {
    const id = req.params.id;

    Movie.findByPk(id)
         .then(object => res.json(object))
         .catch(err => res.send(err));
}

//put
function replace(req, res, next) {
    const id = req.params.id;

    Movie.findByPk(id).then(object => {
        const title = req.body.title ? req.body.title : "";
        const genreId = req.body.genreId ? req.body.genreId : "";
        const directorId = req.body.directorId ? req.body.directorId : "";

        object.update({
            title: title,
            genreId: genreId,
            directorId: directorId
        }).then(object => res.json(object))
          .catch(err => res.send(err));
    }).catch(err => res.send(err));
}

//patch
function update(req, res, next) {
    const id = req.params.id;

    Movie.findByPk(id).then(object => {
        const title = req.body.title ? req.body.title : object.title;
        const genreId = req.body.genreId ? req.body.genreId : object.genreId;
        const directorId = req.body.genreId ? req.body.genreId : object.directorId;

        object.update({
            title: title,
            genreId: genreId,
            directorId: directorId
        }).then(object => res.json(object))
          .catch(err => res.send(err));
    }).catch(err => res.send(err));
}

//delete
function destroy(req, res, next) {
    const id = req.params.id;

    Movie.destroy({ where : {id : id} })
         .then(object => res.json(object))
         .catch(err => res.send(err));
}

function addActor(req, res, next) {
    const idMovie = req.body.idMovie;
    const idActor = req.body.idActor;

    Movie.findByPk(idMovie).then(movie => {
        Actor.findByPk(idActor).then(actor => {
            movie.addActor(actor);
            res.json(movie);
        }).cathc(err => res.send(err));
    }).catch(err => res.send(err));
}

module.exports = {
    create,
    list,
    index,
    replace,
    update,
    destroy,
    addActor
}