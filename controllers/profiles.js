const express = require('express');
const Profile = require('../models/profile');

//post
function create(req, res, next) {
    const description = req.body.description;
    const status = req.body.status;
    const permissions = req.body.permissions;

    let profile = new Profile({
        description: description,
        status: status,
        permissions: permissions
    });

    profile.save()
           .then(object => res.status(200).json({
                message: "Profile created",
                obj: object
           })).catch(ex => res.status(500).json({
                message: "No se pudo",
                obj: ex
           }));
}

//get
function list(req, res, next) {

    Profile.find()
           .then(objects => res.status(200).json({
                message: "List",
                obj: objects
           })).catch(ex => res.status(500).json({
                message: "No List",
                obj: ex
           }));
}

//get
function index(req, res, next) {
    const id = req.params.id;

    Profile.find({ "_id" : id })
            .then(object => res.status(200).json({
                message: "Index",
                obj: object
            })).catch(ex => res.status(500).json({
                message: "No Index",
                obj: ex
            }));
}

//put
function replace(req, res, next) {
    const id = req.params.id;

    Profile.findOneAndUpdate({ "_id" : id })
            .then(object => res.status(200).json({
                message: "Profile update",
                obj: object
            })).catch(ex => res.status(500).json({
                message: "No replace",
                obj: ex
            }));
}

//patch
function update(req, res, next) {
    const id = req.params.id;

    Profile.findOneAndUpdate({ "_id" : id })
            .then(object => res.status(200).json({
                message: "Profile update",
                obj: object
            })).catch(ex => res.status(500).json({
                message: "No update",
                obj: ex
            }));
}

//delete
function destroy(req, res, next) {
    const id = req.params.id;

    Profile.findOneAndRemove({ "_id" : id })
            .then(object => res.status(200).json({
                message: "Profile deleted",
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