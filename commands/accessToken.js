const mongoose = require("mongoose")
const discord = require("discord.js")
mongoose.connect(`mongodb+srv://zinx:ghj@cluster0.dggws.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log(`Connected to the database!`);
}).catch((err) => {
    console.log(err);
})
const User = require('../models/user');
const Twitte12 = require('../models/twitter')
module.exports.run = async (client, message, args) => {
    // this sets the appkey on mongodb
    Twitte12.findOne({
        discord: message.author.id
    }, (err, GetData) => {
        if (!GetData) {
            message.reply("Login Failed, I Couldnt Find Your Account")
        } else {
            Twitte12.findOne({ 'discord': message.author.id }, (err1, DataBOI1) => {
                if (DataBOI1) {
                   if (DataBOI1.discord == message.author.id) {
                        const reason = args.slice(1).join(" ") || null
                        if (!reason == ! null) return message.channel.send(`Failed to change accessToken.The accessToken Cant be null.`);
                        Twitte12.collection.updateOne({ "discord": message.author.id }, { $set: { "accessToken":  reason} })
                        message.reply("Changed..accessToken")
                   }else{
                       messsage.reply("err i couldnt find your account") // THIS WILL NEVER SHOW SINCE IT SHOULD STOP BEFORE THIS!!!
                   }
                }
            })
        }
    })
}
module.exports.config = {
    name: "accesstoken",
    description: "",
    usage: "!appKey",
    accessableby: "Members",
    aliases: []
}