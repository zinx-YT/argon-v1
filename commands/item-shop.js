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
        'url': 'https://fortnite-api.com/v2/shop/br/combined',
        'headers': {
          },
      };
      const reasonLower = args.slice(1).join(" ") || null
      if (!reasonLower == ! null) return message.reply("Unsupported Language")
      const reason = reasonLower.toLowerCase()

      const reason2 = args.slice(1).join(" ") || null
      console.log(reason2)
      if (reason2 != null){
        message.reply(reason2)
      }
      if (reason != null) {
        if (reason == "english") {
          authRequest.url = "https://fortnite-api.com/v2/shop/br/combined"
        }else if(reason == "español") {       
          authRequest.url = "https://fortnite-api.com/v2/shop/br/combined?lang=es-419"
        }else{
          return message.reply("Unsupported Language")
        }
      }
      if (reason != null) {
        if (reason != "english") {
          if (reason != "español"){
          return message.reply("no")
          }
        }else{
          
        }
      }
      
      request(authRequest, function (error, response) {
      //  JSON.parse(response.body)
      
      fs.writeFile(path.join(__dirname, "shop.json"), response.body, 'utf8', (err) => {
           const shop = require("./shop.json")
           const ok = shop['data']
           const shop1 = ok["featured"]["entries"]
           
        
         //  const daily = shop1["daily"]["entries"]
          // const test3 = test2['data']
          // const test4 = test3['name']
           var array = [];
           var array1 = [];
           for (const index of shop1) {  
                const lol = index['items'][0]['name']
               // console.log(lol)
               // var eeeeee = []
               // eeeeee + (`• ${lol}\n`)
               // test234 = [eeeeee]
                array.push("\n" + "• " + lol);
              // console.log(array)
           }
           const NOWLOWER = reason.toLowerCase()
           const lan = require("../logs/selectionLan.json")
           message.reply(lan[NOWLOWER] + "\n" + array)
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
            if (reason != null) {
              if (reason == "english") {
            //    return tweet();
              }else if(reason == "español") {
              //  return tweet();
               
              }else{
                return message.reply("Unsupported Language")
              }
            }
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
    name: "shop",
    description: "",
    usage: "!shop",
    accessableby: "Members",
    aliases: []
}