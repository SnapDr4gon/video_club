const express = require('express');
const Genre = require('../models/genre');

//post
function create(req, res, next) {
    const description = req.body.description;

    let genre = new Genre({
        description: description
    });

    genre.save()
         .then(object => res.status(200).json({
            message: res.__('genre.create.ok'),
            obj: object
         })).catch(ex => res.status(500).json({
            message: res.__('genre.create.wrong'),
            obj: ex
         }));
}

//get
function list(req, res, next) {
    let page = req.params.page ? req.params.page : 1;

    const options = {
        page: page,
        limit: 5
    }

    Genre.paginate({}, options)
         .then(objects => res.status(200).json({
            message: res.__('genre.list.ok'),
            obj: objects
         })).catch(ex => res.status(500).json({
            message: res.__('genre.list.wrong'),
            obj: ex
         }));
}

//get
function index(req, res, next) {
    const id = req.params.id;

    Genre.findOne({ "_id" : id })
         .then(object => res.status(200).json({
            message: res.__('genre.index.ok'),
            obj: object
         })).catch(ex => res.status(500).json({
            message: res.__('genre.index.wrong'),
            obj: ex
         }));
}

//put
function replace(req, res, next) {
    const id = req.params.id;

    const description = req.body.description ? req.body.description : "";

    let genre = new Object({
        _description: description
    });

    Genre.findOneAndUpdate({ "_id" : id }, genre, { new : true })
         .then(object => res.status(200).json({
            message: res.__('genre.replace.ok'),
            obj: object
         })).catch(ex => res.status(500).json({
            message: res.__('genre.replace.wrong'),
            obj: ex
         }));
}

//patch
function update(req, res, next) {
    const id = req.params.id;

    const description = req.body.description;

    let genre = new Object();

    if (description) genre._description = description;

    Genre.findOneAndUpdate({ "_id" : id }, genre)
         .then(object => res.status(200).json({
            message: res.__('genre.update.ok'),
            obj: object
         })).catch(ex => res.status(500).json({
            message: res.__('genre.update.wrong'),
            obj: ex
         }));
}

//delete
function destroy(req, res, next) {
    const id = req.params.id;

    Genre.findOneAndRemove({ "_id" : id })
         .then(object => res.status(200).json({
            message: res.__('genre.destroy.ok'),
            obj: object
         })).catch(ex => res.status(500).json({
            message: res.__('genre.destroy.wrong'),
            obj: ex
         }));
}

module.exports = {
    create,
    list,
    index,
    replace,
    update,
    destroy
}