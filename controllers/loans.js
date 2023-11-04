const express = require('express');
const Loan = require('../models/loan');

//post
function create(req, res, next) {
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const memberId = req.body.memberId;
    const copyId = req.body.copyId;
    const status = req.body.status;

    let loan = new Loan({
        startDate: startDate,
        endDate: endDate,
        member: memberId,
        copy: copyId,
        status: status
    });

    loan.save()
        .then(object => res.status(200).json({
            message: "New loan created and saved",
            obj: object
        })).catch(ex => res.status(500).json({
            message: "Loan could not created or saved",
            obj: ex
        }));
}

//get
function list(req, res, next) {
    let page = req.params.page;

    const options = {
        page: page,
        limit: 5,
        populate: ["_member", "_copy"]
    };

    Loan.paginate({}, options)
        .then(objects => res.status(200).json({
            message: "Loans list",
            obj: objects
        })).catch(ex => res.status(500).json({
            message: "Loans list could not be showed",
            obj: ex
        }));
}

//get
function index(req, res, next) {
    const id = req.params.id;

    Loan.findOne({ "_id" : id }).populate(["_member", "_copy"])
        .then(object => res.status(200).json({
            message: `Information of the Loan with id ${id}`,
            obj: object
        })).catch(ex => res.status(500).json({
            message: `Could not show the information of the Loan with id ${id}`,
            obj: ex
        }));
}

//put
function replace(req, res, next) {
    const id = req.params.id;

    const startDate = req.body.startDate ? req.body.startDate : "";
    const endDate = req.body.endDate ? req.body.endDate : "";
    const memberId = req.body.memberId ? req.body.memberId : "";
    const copyId = req.body.copyId ? req.body.copyId : "";
    const status = req.body.status ? req.body.status : "";

    let loan = new Object({
        _startDate: startDate,
        _endDate: endDate,
        _member: memberId,
        _copy: copyId,
        _status: status
    });

    Loan.findOneAndUpdate({ "_id" : id }, loan, { new : true })
        .then(object => res.status(200).json({
            message: "Loan replaced correctly",
            obj: object
        })).catch(ex => res.status(500).json({
            message: "Loan replaced correctly",
            obj: object
        })).catch(ex => res.status(500).json({
            message: "Could not replace Loan correctly",
            obj: ex
        }));
}

//patch
function update(req, res, next) {
    const id = req.params.id;

    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const memberId = req.body.memberId;
    const copyId = req.body.copyId;
    const status = req.body.status;

    let loan = new Object();

    if (startDate) loan._startDate = startDate;
    if (endDate) loan._endDate = endDate;
    if (memberId) loan._memberId = memberId;
    if (copyId) loan._copyId = copyId;
    if (status) loan._status = status;

    Loan.findOneAndUpdate({ "_id" : id }, loan)
        .then(object => res.status(200).json({
            message: "Loan updated correctly",
            obj: object
        })).catch(ex => res.status(500).json({
            message: "Could not update Loan correctly",
            obj: ex
        }));
}

//delete
function destroy(req, res, next) {
    const id = req.params.id;

    Loan.findOneAndRemove({ "_id" : id })
        .then(object => res.status(200).json({
            message: "Loan deleted correctly",
            obj: object
        })).catch(ex => res.status(500).json({
            message: "Could not delete Loan correctly",
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