const mongoose = require('mongoose')
const md5 = require("../util/md5")
const baseModel = require('./base-model')
const Schema = mongoose.Schema

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: true
    },
    mainimage: {
        type: String,
        required: true
    },
    subimage: {
        type: [],
        require: true
    },
    detail: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        default: 1
    },
    status: {
        type: Boolean,
        default: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    ...baseModel,
}, {
    versionKey: false
})

module.exports = productSchema