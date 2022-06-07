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
const sleep = ms => new Promise(r => setTimeout(r, ms));
const User = require('../models/user');
module.exports.run = async (client, message, args) => {
        const Reaction1 = "one"
        const Reaction2 = "two"
        User.findOne({
            discord: message.author.id
        }, (err, GetData) => {
            if (!GetData) { 
                message.reply("Login Failed, I Couldnt Find Your Account")
            } else {
                User.findOne({ 'discord': message.author.id }, (err1, DataBOI1) => {
                    if (DataBOI1) {
                       if (DataBOI1.discord == message.author.id) {
                            message.channel.send("Logging in...").then(botMessage => {
                            setTimeout(() => {
                                botMessage.edit(content="Hello")
                                const embed = new discord.MessageEmbed()
                                .setColor('#0077FC')
                                .setTitle(DataBOI1.displayName)
                                .addFields(
                                    { name: 'Twitter', value:"React to 1️⃣"},
                                    { name: 'nothing', value:"React to 2️⃣" },
                                    { name: 'Still nothing', value:"React to 3️⃣" },
                                )
                                .setTimestamp();
                                botMessage.edit(content=embed)
                                botMessage.react("1️⃣")
                                botMessage.react("2️⃣")
                                botMessage.react("3️⃣")

                                client.on('messageReactionAdd', async (reaction, user) => {
                                    if(user.bot) return;
                                    if(reaction.emoji.name === "1️⃣"){
                                        const embed = new discord.MessageEmbed()
                                        .setColor('#0077FC')
                                        .setTitle("Page 1")
                                        .addFields(
                                            { name: '!appkey', value:"LOL"},
                                            { name: '!appsecret', value:"<---"},
                                            { name: '!accesstoken', value:"LOL"},
                                            { name: '!accesssecret', value:"<---"},
                                        )
                                        if (message.channel.type === "dm") {
                                            
                                        }else{
                                            botMessage.reactions.removeAll()
                                        }
                                        botMessage.react("1️⃣")
                                        botMessage.react("2️⃣")
                                        botMessage.react("3️⃣")
                                        botMessage.edit(content=embed)
                                    }else if (reaction.emoji.name === "2️⃣"){
                                        const embed = new discord.MessageEmbed()
                                        .setColor('#0077FC')
                                        .setTitle("Page 2")
                                        .addFields(
                                            { name: '!language', value:"Choose a language"},
                                            { name: 'discord', value: message.author.id },
                                        )
                                        if (message.channel.type === "dm") {
                                            
                                        }else{
                                            botMessage.reactions.removeAll()
                                        }
                                        botMessage.react("1️⃣")
                                        botMessage.react("2️⃣")
                                        botMessage.react("3️⃣")
                                        botMessage.edit(content=embed)
                                    }else if (reaction.emoji.name === "3️⃣"){
                                        const embed = new discord.MessageEmbed()
                                        .setColor('#0077FC')
                                        .setTitle("Page 3")
                                        .addFields(
                                            { name: 's', value:"NOTHING LOL"},
                                            { name: 'discord', value: message.author.id },
                                        )
                                        if (message.channel.type === "dm") {
                                            
                                        }else{
                                            botMessage.reactions.removeAll()
                                        }
                                        botMessage.react("1️⃣")
                                        botMessage.react("2️⃣")
                                        botMessage.react("3️⃣")
                                        botMessage.edit(content=embed)
                                        console.log("3 or none")
                                    }else{
                                        console.log("err or nothing")
                                    }
                                })
                            }, 2000);
                            })
                        }else{
                            console.log(DataBOI1)
                        }
                    }else{
                        console.log("NO")
                    }
                })
                //const msg = await message.channel.send("Logging in...")
              /* message.channel.send("Logging in...").then(botMessage => {
                setTimeout(() => {
                    // Edit msg 20 seconds lat
                    var user = User.findOne({ "discord": message.author.id })
                    if (user) {
                        console.log(user.email)
                        botMessage.edit(content="Hello " + user.displayName)
                    }
                    else{
                        botMessage.edit(content="Error Finding your account!")
                    }
                  }, 2000);*/
                  
           
                //botMessage.edit(content="Hello User",  500) // i need to add the persons display name
           //    })
              //  idk = User.findById({discord: message.author.id})
              //  console.log(idk)
              //  msg.edit("Hello", 5000)
               // msg.edit("E")
            }
        })
    
    
}
module.exports.config = {
    name: "login",
    description: "",
    usage: "!setup-user",
    accessableby: "Members",
    aliases: []
}