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
        'url': 'https://fortnite-api.com/v2/news/br/?language=es-419',
        'headers': {
            'Content-Type': ''
          },
        "encoding": null,
      };
      var authRequest2 = {
        
        'method': 'GET',
        'url': 'https://fortnite-api.com/v2/news/br/?language=es-419',
        'headers': {
            'Content-Type': 'image/gif'
          },
        "encoding": null,
      };
      request(authRequest, function (error, response) {
      //  JSON.parse(response.body)
      
      fs.writeFile(path.join(__dirname, "../logs/newscontent.json"), response.body, "utf-8", (err) => {
          const news = require("../logs/newscontent.json")
          const log1 = news['data']['image']
            console.log(log1)
        authRequest2.url = log1
        fs.writeFile(path.join(__dirname, "news.gif"), authRequest2, "utf-8", (err) => {
          //  if (id not in activos){}
          fs.readFile(path.join(__dirname, "news.gif"), (err, data) => {
          //   const attachment = new MessageAttachment(data, "news.gif")
            // const test2 = require("./news.gif")
            message.reply("News -- disabled")
          })
        })
          
     //   fs.readFile(path.join(__dirname, "map.png"), (err, data) => {
        //    const attachment = new MessageAttachment(data, "map.png")
          // const test2 = require("./map.png")
     //      message.reply("test 1",attachment )
     //   })
           //console.log(test3)
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
    name: "news",
    description: "",
    usage: "!setup-user",
    accessableby: "Members",
    aliases: []
}