const mongooes = require('mongoose');
const data101 = mongooes.Schema({
    "createdAt":Date,
    "displayName":String,
    "discord":String,
    "loginToken": String,
})

module.exports = mongooes.model("users", data101);