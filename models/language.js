const mongooes = require('mongoose');
const data120 = mongooes.Schema({
    "language":String,
    "discord":String
})

module.exports = mongooes.model("lanuage", data120);