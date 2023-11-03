const mongoose = require('mongoose')

const Schema = mongoose.Schema

const set = {
    block: false,
    role: "user"

}

const User = new Schema({
    username: { type: 'String', required: true, unique: true, minlength: 3 },
    email: { type: 'string', required: false,},
    question_query: { type: 'object', required: false},
    password: { type: 'string', required: true },
    invoices : {type: 'array'},
    set: { type: 'object', default: set }

}, { timestamps: true });

module.exports = mongoose.model('User', User)