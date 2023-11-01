const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const schema = mongoose.Schema({
    _number: Number,
    _format: {
        type: String,
        enum: ['VHS', 'DVD', 'BLURAY']
    },
    _movie: {
        type: mongoose.Schema.ObjectId,
        ref: 'Movie'
    },
    _status: {
        type: String,
        enum: ['AVAILABLE', 'RENTED']
    }
});

class Copy {

    constructor(number, format, movie, status) {
        this._number = number;
        this._format = format;
        this._movie = movie;
        this._status = status;
    }

    get number() {
        return this._number;
    }

    set number(value) {
        this._number = value;
    }

    get format() {
        return this._format;
    }

    set format(value) {
        this._format = value;
    }

    get movie() {
        return this._movie;
    }

    set movie(value) {
        this._movie = value;
    }

    get status() {
        return this._status;
    }

    set status(value) {
        this._status = value;
    }
}

schema.loadClass(Copy);
schema.plugin(mongoosePaginate);
module.exports = mongoose.model('Copy', schema);