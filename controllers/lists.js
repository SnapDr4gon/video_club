const express = require('express');
const List = require('../models/list');
const _ = require('mongoose-paginate-v2');

//post
function create(req, res, next) {
    const memberId = req.body.memberId;
    const movieId = req.body.movieId;
    const format = req.body.format;
    const date = req.body.date;

    let turn = new List({
        member: memberId,
        movie: movieId,
        format: format,
        date: date
    });

    turn.save()
        .then(object => res.status(200).json({
            message: res.__('turn.create.ok'),
            obj: object
        })).catch(ex => res.status(500).json({
            message: res.__('turn.create.wrong'),
            obj: ex
        }));
}

//get
function list(req, res, next) {
    let page = req.params.page;

    const options = {
        page: page,
        limit: 5,
        populate: ["_member", "_movie"]
    };

    List.paginate({}, options)
        .then(objects => res.status(200).json({
            message: res.__('turn.list.ok'),
            obj: objects
        })).catch(ex => res.status(500).json({
            message: res.__('turn.list.wrong'),
            obj: ex
        }));
}

//get
function index(req, res, next) {
    const id = req.params.id;

    List.findOne({ "_id" : id }).populate(["_member", "_movie"])
        .then(object => res.status(200).json({
            message: res.__('turn.index.ok'),
            obj: object
        })).catch(ex => res.status(500).json({
            message: res.__('turn.index.wrong'),
            obj: ex
        }));
}

//put
function replace(req, res, next) {
    const id = req.params.id;

    const memberId = req.body.memberId ? req.body.memberId : "";
    const movieId = req.body.movieId ? req.body.movieId : "";
    const format = req.body.format ? req.body.format: "";
    const date = req.body.date ? req.body.date : "";

    let turn = new Object({
        _member: memberId,
        _movie: movieId,
        _format: format,
        _date: date
    });

    List.findOneAndUpdate({ "_id" : id }, turn, { new : true })
        .then(object => res.status(200).json({
            message: res.__('turn.replace.ok'),
            obj: object
        })).catch(ex => res.status(500).json({
            message: res.__('turn.replace.wrong'),
            obj: ex
        }));
}

//patch
function update(req, res, next) {
    const id = req.params.id;

    const memberId = req.body.memberId;
    const movieId = req.body.movieId;
    const format = req.body.format;
    const date = req.body.date;

    let turn = new Object();

    if (memberId) turn._member = memberId;
    if (movieId) turn._movieId = movieId;
    if (format) turn._format = format;
    if (date) turn._date = date;

    List.findOneAndUpdate({ "_id" : id }, turn)
        .then(object => res.status(200).json({
            message: res.__('turn.update.ok'),
            obj: object
        })).catch(ex => res.status(500).json({
            message: res.__('turn.update.wrong'),
            obj: ex
        }));
}

//delete
function destroy(req, res, next) {
    const id = req.params.id;

    List.findOneAndRemove({ "_id" : id })
        .then(object => res.status(200).json({
            message: res.__('turn.destroy.ok'),
            obj: object
        })).catch(ex => res.status(500).json({
            message: res.__('turn.destroy.wrong'),
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