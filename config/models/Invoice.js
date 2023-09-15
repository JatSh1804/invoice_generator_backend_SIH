const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Invoice = new Schema({
    username: { type: 'String'},
    email: { type: 'string', },
    userid: { type: 'string', },
    date: { type: 'string', },
    company: { type: 'object', },
    billInfo: { type: 'object', },
    serviceCharges : { type: 'array'},
    invoiceId : { type: 'string', required: true},
}, { timestamps: true });

module.exports = mongoose.model('Invoice', Invoice)