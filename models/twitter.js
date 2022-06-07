const mongooes = require('mongoose');
const data10 = mongooes.Schema({
    "discord":String,
    "appKey": String,
    "appSecret": String,
    "accessToken": String,
    "accessSecret": String
})

module.exports = mongooes.model("twitter", data10);