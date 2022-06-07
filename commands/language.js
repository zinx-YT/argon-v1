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
const Language = require('../models/language')
module.exports.run = async (client, message, args) => {
    // this sets the appkey on mongodb
    Language.findOne({
        discord: message.author.id
    }, (err, GetData) => {
        if (!GetData) {
            message.reply("Login Failed, I Couldnt Find Your Account")
        } else {
            Language.findOne({ 'discord': message.author.id }, (err1, DataBOI1) => {
                if (DataBOI1) {
                   if (DataBOI1.discord == message.author.id) {
                        const reason = args.slice(1).join(" ") || null
                        if (!reason == ! null) return message.channel.send(`Failed to change Language.The Language Cant be null.`);
                        if(reason == "english"){
                            Language.collection.updateOne({ "discord": message.author.id }, { $set: { "language":  reason} })
                            message.reply("Changed..Language to " + reason)
                        }else if(reason == "español"){
                            Language.collection.updateOne({ "discord": message.author.id }, { $set: { "language":  reason} })
                            message.reply("Changed..Language to " + reason)
                        }else{
                            message.reply("I cannot change language to " + reason)
                        }
                   }else{
                       messsage.reply("error I couldnt find your account") // THIS WILL NEVER SHOW SINCE IT SHOULD STOP BEFORE THIS!!!
                   }
                }
            })
        }
    })
}
module.exports.config = {
    name: "language",
    description: "",
    usage: "!appKey",
    accessableby: "Members",
    aliases: []
}