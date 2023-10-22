const express = require('express');
const { Member } = require('../db');

//post
function create(req, res, next) {
    const name = req.body.name;
    const lastName = req.body.lastName;
    const address = req.body.address;
    const phone = req.body.phone;
    const status = req.body.status;

    Member.create({
        name: name,
        lastName: lastName,
        address: address,
        phone: phone,
        status: status
    }).then(object => res.json(object))
      .catch(err => res.send(err));
}

//get
function list(req, res, next) {
    Member.findAll()
          .then(object => res.json(object))
          .catch(err => res.send(err));
}

//get
function index(req, res, next) {
    Member.findByPk(id)
          .then(object => res.json(object))
          .catch(err => res.send(err));
}

//put
function replace(req, res ,next) {
    const id = req.params.id;

    Member.findByPk(id).then(object => {
        const name = req.body.name ? req.body.name : "";
        const lastName = req.body.lastName ? req.body.lastName : "";
        const address = req.body.address ? req.body.address : "";
        const phone = req.body.phone ? req.body.phone : "";
        const status = req.body.status ? req.body.status : "";
        
        object.update({
            name: name,
            lastName: lastName,
            address: address,
            phone: phone,
            status: status
        }).then(object => res.json(object))
          .catch(err => res.send(err));
    }).catch(err => res.send(err));
}

//patch
function update(req, res, next) {
    const id = req.params.id;

    Member.findByPk(id).then(object => {
        const name = req.body.name ? req.body.name : object.name;
        const lastName = req.body.lastName ? req.body.lastName : object.lastName;
        const address = req.body.address ? req.body.address : object.address;
        const phone = req.body.phone ? req.body.phone : object.phone;
        const status = req.body.status ? req.body.status : object.status;
        
        object.update({
            name: name,
            lastName: lastName,
            address: address,
            phone: phone,
            status: status
        }).then(object => res.json(object))
          .catch(err => res.send(err));
    }).catch(res.send(err));
}

//delete
function destroy(req, res, next) {
    const id = req.params.id;
    
    Member.destroy({ where : { id : id } })
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
