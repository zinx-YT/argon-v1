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
module.exports.run = async (client, message, args) => {
  Twitte12.findOne({
    discord: message.author.id
}, (err, GetData) => {
    if (!GetData) {
        message.reply("Login Failed, I Couldnt Find Your Account")
    } else {

      var authRequest = {
        
        'method': 'GET',
        'url': 'https://fortnite-api.com/images/map.png',
        'headers': {
            'Content-Type': 'image/png'
          },
        "encoding": null,
      };
      request(authRequest, function (error, response) {
      //  JSON.parse(response.body)
      
      fs.writeFile(path.join(__dirname, "map.png"), response.body, "utf-8", (err) => {
        fs.readFile(path.join(__dirname, "map.png"), (err, data) => {
            const attachment = new MessageAttachment(data, "map.png")
          // const test2 = require("./map.png")
           message.reply("test 1",attachment )
        })
           //console.log(test3)
      })
    
      Twitte12.findOne({ 'discord': message.author.id }, (err1, DataBOI1) => {
        if (DataBOI1) {
          if (DataBOI1.discord == message.author.id) {
            if(DataBOI1.appKey == "") {return message.reply("NO")}
            if(DataBOI1.appSecret == "") {return message.reply("NO")}
            if(DataBOI1.accessSecret == "") {return message.reply("NO")}
            if(DataBOI1.accessToken == "") {return message.reply("NO")}
            const test2 = require("./content.json")
            const test3 = test2['data']['sections']
            var array = [];
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
                   await rwClient.v2.tweet(array)
                   message.reply("This would send tweet if worked")
                }catch (e) {
                    console.log(e)
                    message.reply("Your account didnt add the twitter stuff or there is a er")
                }
            } 
         //   if (reason != null) {
               // return tweet();
         //   }
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

module.exports.config = {
    name: "map",
    description: "",
    usage: "!setup-user",
    accessableby: "Members",
    aliases: []
}