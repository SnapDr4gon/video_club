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
    res.send('Members list');
}

//get
function index(req, res, next) {
    res.send('Members index');
}

//put
function replace(req, res ,next) {
    res.send('Members replaced');
}

//patch
function update(req, res, next) {
    res.send('Members updated');
}

//delete
function destroy(req, res, next) {
    res.send('Members destroyed');
}

module.exports = {
    create,
    list,
    index,
    replace,
    update,
    destroy
}