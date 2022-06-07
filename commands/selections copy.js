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
            const selections = require("../logs/selectionLan.json")
            const selections69 = selections[lan]
            console.log("https://fn-api.com/api/shop/br/" + selections69)
            request("https://fn-api.com/api/shop/br/" + selections69, function (error, response) {
              fs.writeFile(path.join(__dirname, "../logs/content" + lan + ".json"), response.body, 'utf8', (err) => {
                const test2 = require("../logs/content" + lan + ".json")
                const test3 = test2['data']['sections']
                var array = [];
                var array1 = [];
                for (const index of test3) {
                  lol = index['name']
                  lol2 = index['quantity']
                  // console.log(lol)
                  var eeeeee = []
                  eeeeee + (`• ${lol}\n`)
                  test234 = [eeeeee]
                  array.push("\n" + "•" + lol + "(x" + lol2 + ")");
                  //  console.log(array)
                }
                message.reply(selections[lan + "title"] + "\n" + array)
                const reasonLower = args.slice(1).join(" ") || null
                if(reasonLower == "send"){
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
                             await rwClient.v2.tweet(selections[lan + "title"] + "\n" + array)
                             message.reply("Sent Tweet!")
                          }catch (e) {
                              console.log(e)
                              message.reply("I not sure what error it (1. you may put the wrong api keys in or you already sent this tweet)")
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

     
      
       /* Twitte12.findOne({ 'discord': message.author.id }, (err1, DataBOI1) => {
          if (DataBOI1) {
            if (DataBOI1.discord == message.author.id) {
              if(DataBOI1.appKey == "") {return message.reply("NO")}
              if(DataBOI1.appSecret == "") {return message.reply("NO")}
              if(DataBOI1.accessSecret == "") {return message.reply("NO")}
              if(DataBOI1.accessToken == "") {return message.reply("NO")}
              const test2 = require("./content.json")
              const test3 = test2['data']['sections']
              var array = [];
             for (const index of test3) {  
                  lol = index['name']
                  lol2 = index['quantity']
                  console.log(lol)
                  var eeeeee = []
                  eeeeee + (`• ${lol}\n`)
                  test234 = [eeeeee]
                  array.push("\n" + "•" + lol + "(x" + lol2 + ")");
                  console.log(array)
             }
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
                const selectionsLan = require("../logs/selectionLan.json")
                
                const tweet = async () => {
                  try {
                     await rwClient.v2.tweet(selectionsLan[reason] + "\n" + array)
                     message.reply("This would send tweet if worked")
                  }catch (e) {
                      console.log(e)
                      message.reply("Your account didnt add the twitter stuff or there is a er")
                  }
              } 
            //  if (reason != null) {
            //    if (reason == "english") {
           // //      return tweet();
           //     }else if(reason == "español") {
            //      return tweet();
           //      
           //     }else{
          //        return message.reply("Unsupported Language")
             //   }
            //  }
              //  if (reason != null) return tweet();
           }
          }
        })
  
  
      //    const test = response.body['data']
            //  console.log(test)
           //   const k = JSON.stringify(response.body)
             
              //console.log(k['data']['timestamp'])
          
        })
      }})
        //response = request.get("https://fn-api.com/api/shop/br/sections")
  
  /*request(authRequest, function (error, response) {
    if (error) throw new Error(error);
      
     fs.writeFile(path.join(__dirname, "content.json"), lol, 'utf8', (err) => {
         if (err) {
        console.log(`Error writing file: ${err}`);
        message.reply("There was an error")
        } else {
          //	console.log(`generated stw successfully`);
            const file = fs.readFileSync(path.join(__dirname, "content.json"))
          const attachment = new MessageAttachment(file, "content.json")
          message.reply("Heres the content file", attachment)
        }
     })
      })
    */
    }
  })

}

module.exports.config = {
  name: "sections2",
  description: "",
  usage: "!setup-user",
  accessableby: "Members",
  aliases: []
}