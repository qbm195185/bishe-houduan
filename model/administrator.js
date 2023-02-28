const mongoose = require('mongoose')
const md5 = require("../util/md5")
const baseModel = require('./base-model')

const adSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        set: value => md5(value),
        select: false
    },
    role: {
        type: String,
        required: true,
        default: 'three'
    },
    ...baseModel,
}, {
    versionKey: false
})

module.exports = adSchema