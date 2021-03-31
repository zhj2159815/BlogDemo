const mongoose = require('mongoose')

const blog = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        validate: [function (value) {
            return value.length <= 200
        }, 'title is too long (200 max)'],
        default: 'New Post'
    },
    text: {
        type: String,
    },
    author: {
        type: String,
        required: true,
        validate: [function (value) {
            return value.length <= 200
        }, 'author is too long (200 max)'],
        default: 'New Post'
    },
    createdOn: {
        type: Number,
        required: true,
        default: new Date().getTime()
    }
})

blog.static({
    list: function (callback) {
        this.find({}, null, { sort: { _id: -1 } }, callback)
    }
})

module.exports = mongoose.model('blog', blog)
