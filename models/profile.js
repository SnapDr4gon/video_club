const mongoose = require('mongoose');

const schema = mongoose.Schema({
    _description: String,
    _status: Boolean,
    _permissions: [{
            type: mongoose.Schema.Types.String,
            ref: 'Permission'
    }]
});

class Profile {

    constructor(description, status, permissions) {
        this._description = description;
        this._status = status;
        this._permissions = permissions;
    }

    get description() {
        return this._description;
    }

    set description(value) {
        this._description = value;
    }

    get status() {
        return this._status;
    }

    set status(value) {
        this._status = value;
    }

    get permissions() {
        return this._permissions;
    }

    set permissions(value) {
        this._permissions = value;
    }
}

schema.loadClass(Profile);
module.exports = mongoose.model('Profile', schema);