const mongoose = require('mongoose')
const md5 = require("../util/md5")
const baseModel = require('./base-model')

const userSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    school: {
        type: String,
        required: true,
        default: ''
    },
    email: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
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
        default: 'student'
    },
    ...baseModel,
}, {
    versionKey: false
})

module.exports = userSchema