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
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const User = require('../models/user');
const Twitter13 = require('../models/twitter');
const database = require("mime-db");
const { date } = require("assert-plus");
const twitter = require("../models/twitter");
const language1 = require("../models/language")
module.exports.run = async (client, message, args) => {
    if (message.channel.type === "dm") {
        User.findOne({
            discord: message.author.id
        }, (err, GetData) => {
            const reason = args.slice(1, 321313113).join(" ") || null
            if (reason == null) return message.channel.send(`Tip: !signup {anyusername}`);
            if (!GetData) { } else {
                return message.channel.send("Failed to create account. The username may already be taken or you might already have an account")
            }
            User.findOne({ 'displayName': reason }, (err1, DataBOI1) => {
                if (DataBOI1) {
                    if (DataBOI1.displayName == reason.toString()) {
                        ReadyBOI = false
                        return message.channel.send('Username is already in use please try again (run !setup-user again)')
                    }
                } else {
                    const Random = crypto.randomBytes(16).toString('hex')
                    const user = new User({
                        displayName: reason,
                        discord: message.author.id,
                        loginToken: Random,
                        createdAt: Date.now()
                    })
                    user.save().catch(err1 => console.log(err1))
                    const twitter2 = new Twitter13({
                        discord: message.author.id,
                        appKey: "",
                        appSecret: "",
                        accessToken: "",
                        accessSecret: "",
                        createdAt: Date.now()
                    })
                    twitter2.save().catch(err1 => console.log(err1))
                    const lanuage12 = new language1({
                        language: "english",
                        discord: message.author.id
                    })
                    lanuage12.save().catch(err1 => console.log(err1))
                    const embed = new discord.MessageEmbed()
                        .setColor('#0077FC')
                        .setTitle("Account Created!")
                        .addFields(
                            { name: 'login-Token', value: user.loginToken },
                            { name: 'discord', value: message.author.id },
                        )
                        .setTimestamp();
                    return message.reply(embed)
                }
            })
        })
    } else {
        message.reply("(I will add code for none dm soon!) Please run !signup in dms")
    }
}
module.exports.config = {
    name: "setup-user",
    description: "",
    usage: "!setup-user",
    accessableby: "Members",
    aliases: ["user", "signup"]
}