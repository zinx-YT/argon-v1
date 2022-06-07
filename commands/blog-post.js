const { TwitterApi } = require('twitter-api-v2');
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
const request = require('request');
const fs = require("fs")
const { MessageEmbed, MessageAttachment } = require("discord.js");
const path = require("path")
const Twitte12 = require('../models/twitter')
const Language = require('../models/language')
module.exports.run = async (client, message, args) => {
  Language.findOne({
    discord: message.author.id
  }, (err, GetData) => {
    if (!GetData) {
      message.reply("Login Failed, I Couldnt Find Your Account")
    } else {
      Language.findOne({ 'discord': message.author.id }, (err1, DataBOI1) => {
        if (DataBOI1) {
          if (DataBOI1.discord == message.author.id) {
            const lan = DataBOI1.language
            // console.log(lan)
           
            //const reason = reasonLower.toLowerCase()
            const selections = require("../logs/bloglan.json")
            const selections69 = selections[lan]
            console.log("https://fn-api.com/api/" + selections69)
            request("https://fn-api.com/api/" + selections69, function (error, response) {
              fs.writeFile(path.join(__dirname, "../logs/blog" + lan + ".json"), response.body, 'utf8', (err) => {
                const test2 = require("../logs/blog" + lan + ".json")
                const test3 = test2['data']['fortnite']['posts'][0]
                const id = test3['id']
                const titulo = test3['title']
                const url = test3['url']
                const imagen = test3['images']['share']
                var array = [];
                var array1 = [];
              //  for (const index of test3) {
                //  lol = index['images']['trending']
                 // lol2 = index['url']
                  // console.log(lol)
                 // var eeeeee = []
                //  eeeeee + (`• ${lol}\n`)
                //  test234 = [eeeeee]
                //  array.push("\n" + "•" + lol + "(x + )");
                  //  console.log(array)
              //  }
               // message.reply(selections[lan + "title"] + "\n" + array)
               console.log(imagen)
             //  const attachment = new MessageAttachment(imagen)
               const embed = new discord.MessageEmbed()
               .setColor('#0077FC')
               .setTitle(titulo)
               .setDescription(url)
               .setImage(imagen)
               .setTimestamp();
                message.reply(embed)   
              // const file = fs.readFileSync(path.join(__dirname, "content.json"))
                 const reasonLower = args.slice(1).join(" ") || null
                if(reasonLower == "send"){
                 //   message.reply("This been disabled")
                  Twitte12.findOne({ 'discord': message.author.id }, (err1, DataBOI1) => {
                    if (DataBOI1) {
                      if (DataBOI1.discord == message.author.id) {
                        if (DataBOI1.appKey == "") { return message.reply("NO") }
                        if (DataBOI1.appSecret == "") { return message.reply("NO") }
                        if (DataBOI1.accessSecret == "") { return message.reply("NO") }
                        if (DataBOI1.accessToken == "") { return message.reply("NO") }
                        const appKey1 = DataBOI1.appKey
                        const appSecret1 = DataBOI1.appSecret
                        const accessToken1 = DataBOI1.accessToken
                        const accessSecret1 = DataBOI1.accessSecret
                        const twitterclient = new TwitterApi({
                            appKey: appKey1,
                            appSecret: appSecret1,
                            accessToken: accessToken1,
                            accessSecret: accessSecret1
                        })
                        const rwClient = twitterclient.readWrite
                        const tweet = async () => {
                          try {
                             await rwClient.v2.tweet(titulo)
                             message.reply("Sent Tweet!")
                          }catch (e) {
                             
                             
                              if(e['data']['detail'] == "Your account is temporarily locked. Please log in to https://twitter.com to unlock your account."){
                                message.reply("Your account is temporarily locked. Please log in to https://twitter.com to unlock your account.")
                              }else if(e['data']['detail'] == "You are not allowed to create a Tweet with duplicate content."){
                                message.reply("You are not allowed to create a Tweet with duplicate content.")
                              }else{
                                message.reply("I not sure what error it (1. you may put the wrong api keys in or you already sent this tweet) + if one of the devs know the issue then we will update this text")
                                console.log(e)
                              }
                          }
                        } 
                        tweet();
                       // message.reply("This would of sent the tweet")
                      }
                    }
                  })
                }
              })
            })
          }
        }
      })
    }
  })

}

module.exports.config = {
  name: "blog",
  description: "",
  usage: "!setup-user",
  accessableby: "Members",
  aliases: []
}