const express = require('express');
const List = require('../models/list');

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
            message: "New Turn created and saved correctly",
            obj: object
        })).catch(ex => res.status(500).json({
            message: "Turn could not be created or saved",
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
            message: "Waiting list",
            obj: objects
        })).catch(ex => res.status(500).json({
            message: "Waiting list could not be showed"
        }));
}

//get
function index(req, res, next) {
    const id = req.params.id;

    List.findOne({ "_id" : id }).populate(["_member", "_movie"])
        .then(object => res.status(200).json({
            message: `Information of the Turn with id ${id}`,
            obj: object
        })).catch(ex => res.status(500).json({
            message: `Could not show the information of the Turn with id ${id}`,
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
            message: "Turn replaced correctly",
            obj: object
        })).catch(ex => res.status(500).json({
            message: "Could not replace Turn correctly",
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
            message: "Turn updated correctly",
            obj: object
        })).catch(ex => res.status(500).json({
            message: "Could not update Turn correctly",
            obj: ex
        }));
}

//delete
function destroy(req, res, next) {
    const id = req.params.id;

    List.findOneAndRemove({ "_id" : id })
        .then(object => res.status(200).json({
            message: "Turn deleted correctly",
            obj: object
        })).catch(ex => res.status(500).json({
            message: "Could not delete Turn correctly",
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