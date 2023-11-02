const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const schema = mongoose.Schema({
    _name: String,
    _lastName: String,
    _phone: String,
    _address: {
        street: String,
        number: String,
        zip: String,
        city: String,
        state: String,
        country: String
    },
    _favoriteActors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Actor'
    }],
    _favoriteDirectors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Director'
    }]
});

class Member {
  
    constructor(name, lastName, phone, address, favoriteActors, favoriteDirectors) {
        this._name = name;
        this._lastName = lastName;
        this._phone = phone;
        this._address = address;
        this._favoriteActors = favoriteActors;
        this._favoriteDirectors = favoriteDirectors;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get lastName() {
        return this._lastName;
    }

    set lastName(value) {
        this._lastName = value;
    }

    get phone() {
        return this._phone;
    }

    set phone(value) {
        this._phone = value;
    }

    get address() {
        return this._address;
    }

    set address(value) {
        this._address = value;
    }

    get favoriteActors() {
        return this._favoriteActors;
    }

    set favoriteActors(value) {
        this._favoriteActors = value;
    }

    get favoriteDirectors() {
        return this._favoriteDirectors;
    }

    set favoriteDirectors(value) {
        this._favoriteDirectors = value;
    }
}

schema.loadClass(Member);
schema.plugin(mongoosePaginate);
module.exports = mongoose.model('Member', schema);
