const express = require('express');

//post
function create(req, res, next) {
    res.send('Members created');
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