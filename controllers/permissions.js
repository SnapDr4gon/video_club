const express = require('express');
const Permission = require('../models/permission');

//post
function create(req, res, next) {
    const description = req.body.description;
    const type = req.body.type;

    let permission = new Permission({
        description: description,
        type: type
    });

    permission.save()
                .then(object => res.status(200).json({
                    message: "Created",
                    obj: object
                })).catch(ex => res.status(500).json({
                    message: "No created",
                    obj: ex
                }));
}

//get
function list(req, res, next) {

    Permission.find()
                .then(object => res.status(200).json({
                    message: "List",
                    obj: object
                })).catch(ex => res.status(500).json({
                    message: "No list",
                    obj: ex
                }));
}

//get
function index(req, res, next) {
    const id = req.params.id;

    Permission.find({ "_id" : id })
                .then(object => res.status(200).json({
                    message: "Index",
                    obj: object
                })).catch(ex => res.status(500).json({
                    message: "No index",
                    obj: ex
                }));
}

//put
function replace(req, res, next) {
    const id = req.params.id;

    Permission.findOneAndUpdate({ "_id" : id })
                .then(object => res.status(200).json({
                    message: "Replace",
                    obj: object
                })).catch(ex => res.status(500).json({
                    message: "No replace",
                    obj: ex
                }));
}

//patch
function update(req, res, next) {
    const id = req.params.id;

    Permission.findOneAndUpdate({ "_id" : id })
                .then(object => res.status(200).json({
                    message: "Update",
                    obj: object
                })).catch(ex => res.status(500).json({
                    message: "No update",
                    obj: ex
                }));
}

//delete
function destroy(req, res, next) {
    const id = req.params.id;

    Permission.findOneAndRemove({ "_id" : id })
                .then(object => res.status(200).json({
                    message: "Delete",
                    obj: object
                })).catch(ex => res.status(500).json({
                    message: "No delete",
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