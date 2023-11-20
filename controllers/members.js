const express = require('express');
const Member = require('../models/member');

//post
function create(req, res, next) {
    const name = req.body.name;
    const lastName = req.body.lastName;
    const phone = req.body.phone;
    const address = req.body.address;
    const favoriteActors = req.body.favoriteActors;
    const favoriteDirectors = req.body.favoriteDirectors;

    let member = new Member({
        name: name,
        lastName: lastName,
        phone: phone,
        address: address,
        favoriteActors: favoriteActors,
        favoriteDirectors: favoriteDirectors
    });

    member.save()
          .then(object => res.status(200).json({
            message: res.__('member.create.ok'),
            obj: object
          })).catch(ex => res.status(500).json({
            message: res.__('member.create.wrong'),
            obj: ex
          }));
}

//get
function list(req, res, next) {
    let page = req.params.page ? req.params.page : 1;

    const options = {
        page: page,
        limit: 5,
        populate: ["_favoriteActors", "_favoriteDirectors"]
    };

    Member.paginate({}, options)
          .then(objects => res.status(200).json({
            message: res.__('member.list.ok'),
            obj: objects
          })).catch(ex => res.status(500).json({
            message: res.__('member.list.wrong'),
            obj: ex
          }));
}

//get
function index(req, res, next) {
    const id = req.params.id;

    Member.findOne({ "_id" : id }).populate(["_favoriteActors", "_favoriteDirectors"])
          .then(object => res.status(200).json({
            message: res.__('member.index.ok'),
            obj: object
          })).catch(ex => res.status(500).json({
            message: res.__('member.index.wrong'),
            obj: ex
          }));
}

//put
function replace(req, res, next) {
    const id = req.params.id;

    const name = req.body.name ? req.body.name : "";
    const lastName = req.body.lastName ? req.body.lastName : "";
    const phone = req.body.phone ? req.body.phone : "";
    const address = req.body.address ? req.body.address : "";
    const favoriteActors = req.body.favoriteActors ? req.body.favoriteActors : [];
    const favoriteDirectors = req.body.favoriteDirectors ? req.body.favoriteDirectors : [];

    let member = new Object({
        _name: name,
        _lastName: lastName,
        _phone: phone,
        _address: address,
        _favoriteActors: favoriteActors,
        _favoriteDirectors: favoriteDirectors
    });

    Member.findOneAndUpdate({ "_id" : id }, member, { new : true })
          .then(object => res.status(200).json({
            message: res.__('member.replace.ok'),
            obj: object
          })).catch(ex => res.status(500).json({
            message: res.__('member.replace.wrong'),
            obj: ex
          }));
}

//patch
function update(req, res, next) {
    const id = req.params.id

    const name = req.body.name;
    const lastName = req.body.lastName;
    const phone = req.body.phone;
    const address = req.body.address;
    const favoriteActors = req.body.favoriteActors;
    const favoriteDirectors = req.body.favoriteDirectors;

    let member = new Object();

    if (name) member._name = name;
    if (lastName) member._lastName = lastName;
    if (phone) member._phone = phone;
    if (address) member._address = address;
    if (favoriteActors) member._favoriteActors = favoriteActors;
    if (favoriteDirectors) member._favoriteDirectors = favoriteDirectors;

    Member.findOneAndUpdate({ "_id" : id }, member)
          .then(object => res.status(200).json({
            message: res.__('member.update.ok'),
            obj: object
          })).catch(ex => res.status(500).json({
            message: res.__('member.update.wrong'),
            obj: ex
          }));
}

function destroy(req, res, next) {
    const id = req.params.id;

    Member.findOneAndRemove({ "_id" : id })
          .then(object => res.status(200).json({
            message: res.__('member.destroy.ok'),
            obj: object
          })).catch(ex => res.status(500).json({
            message: res.__('member.destroy.wrong'),
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