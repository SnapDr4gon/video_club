const express = require('express');
const Actor = require('../models/actor');

//post
function create(req, res, next) {
    const name = req.body.name;
    const lastName = req.body.lastName;

    let actor = new Actor({
        name: name,
        lastName: lastName
    });

    actor.save()
            .then(object => res.status(200).json({
                message: res.__('actor.create.ok'),
                obj: object
            })).catch(ex => res.status(500).json({
                massage: res.__('actor.create.wrong'),
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

    Actor.paginate({}, options)
            .then(objects => res.status(200).json({
                message: res.__('actor.list.ok'),
                obj: objects
            })).catch(ex => res.status(500).json({
                message: res.__('actor.list.wrong'),
                obj: ex
            }));
}

function index(req, res, next) {
    const id = req.params.id;
  
    Actor.findOne({ "_id" : id })
           .then(object => res.status(200).json({
              message: res.__('actor.index.ok'),
              obj: object
           })).catch(ex => res.status(500).json({
              message: res.__('actor.list.wrong'),
             obj: ex
           }));
}

//put
function replace(req, res, next) {
    const id = req.params.id;

    let name = req.body.name ? req.body.name : "";
    let lastName = req.body.lastName ? req.body.lastName : "";

    let actor = new Object({
        _name: name,
        _lastName: lastName
    });
    
    Actor.findOneAndUpdate({ "_id" : id }, actor, { new : true })
            .then(object => res.status(200).json({
                message: res.__('actor.replace.ok'),
                obj: object
            })).catch(ex => res.status(500).json({
                message: res.__('actor.replace.wrong'),
                obj: ex
            }));
}

//patch
function update(req, res, next) {
    const id = req.params.id;
    
    const name = req.body.name;
    const lastName = req.body.lastName;

    let actor = new Object();

    if (name) actor._name = name;
    if (lastName) actor._lastName = lastName;
  
    Actor.findOneAndUpdate({ "_id" : id })
            .then(object => res.status(200).json({
                message: res.__('actor.update.ok'),
                obj: object
            })).catch(ex => res.status(500).json({
                message: res.__('actor.update.wrong'),
                obj: ex
            }));
}

//delete
function destroy(req, res, next) {
    const id = req.params.id;

    Actor.findByIdAndRemove({ "_id" : id })
            .then(object => res.status(200).json({
                message: res.__('actor.destroy.ok'),
                obj: object
            })).catch(ex => res.status(500).json({
                message: res.__('actor.destroy.wrong'),
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
