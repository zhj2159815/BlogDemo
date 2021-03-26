const mongoose = require('mongoose')

const user = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    validate: [function (value) {
      return value.length <= 120
    }, 'name is too long (120 max)'],
    default: 'New Post'
  },
  psw: {
    type: String,
    required: true,
    validate: [function (value) {
      return value.length <= 120
    }, 'psw is too long (120 max)'],
    default: 'New Post'
  },
})

user.static({
  list: function (callback) {
    this.find({}, null, {sort: {_id: -1}}, callback)
  }
})

module.exports = mongoose.model('user', user)
