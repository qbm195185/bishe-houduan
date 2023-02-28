const mongoose = require('mongoose')
const Schema = mongoose.Schema
const baseModel = require('./base-model')

const commentSchema = new mongoose.Schema({
    comment1: {
        type: String,
        required: true
    },
    comment2: {
        type: Array,
        // required: false
        default:[]
    },
    favoritesCount: {
        type: Number,
        default: 0,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    article: {
        type: Schema.Types.ObjectId,
        ref: "Article",
        required: true
    },
    ...baseModel,
}, {
    versionKey: false
})

module.exports = commentSchema