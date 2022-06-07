const discord = require("discord.js")
//const { Client, Intents } = require('discord.js');
//const client2 = new Client({ intents: [Intents.FLAGS.GUILDS] });
const { TwitterApi } = require('twitter-api-v2');
const dotenv = require("dotenv")
const fs = require("fs");
const { pathToFileURL } = require("url");
const token = "OTQxMDAzNjgxNDMwNjUwOTAx.YgPn-A.witoCe7Huung29U2Q3QMbPpfuPc"
const client = new discord.Client();
const prefix = "!";
const twitterclient = new TwitterApi({
    appKey: "OGO29PA5hJwQmTEPRWeUvEsQC",
    appSecret: "TvePMRb1mqvpMBahLX0XtvBFlKXTwn3Rc78NeUxPfTbC4zYVx5",
    accessToken: "1252586429588426752-ML29jPeOFzK7CPG7jWrv7zMZT5aIRy",
    accessSecret: "xZBhlya8JmOUrn0sx4sKNLTTgaZ6AlFBWgiFZsfkeBU8E"
})

const rwClient = twitterclient.readWrite

const tweet = async () => {
    try {
       await rwClient.v2.tweet("E")
    }catch (e) {
        console.error(e)
    }
} 
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

//tweet()
client.once('ready', () => {
    console.log("that bot is feeling horny")
})
client.commands = new discord.Collection();
client.aliases = new discord.Collection();
fs.readdir("./commands/", (err, files) => {
    if(err) console.error(error)
    let jsfiles = files.filter(f => f.split(".").pop() === "js")
    if (jsfiles.length <= 0) {
      return console.log("No commands to log in FOLDER NAME")
    }
    console.log(`Loading ${jsfiles.length} commands from FOLDER NAME...`)
    jsfiles.forEach((f,i) => {
      let props = require(`./commands/${f}`)
      console.log(`${i + 1}: ${f} loaded!`)
      client.commands.set(props.config.name, props)
      props.config.aliases.forEach(alias => {
        client.aliases.set(alias, props.config.name)
    });
    })
  })
client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    let messageArray = message.content.toLowerCase().split(" ");
    let cmd = messageArray[0];
    const args = message.content
		.slice(prefix.length)
		.trim()
		.split(/ +/);
    if (!message.content.toUpperCase().startsWith(prefix)) return;
    let commandfile = client.commands.get(cmd.slice(prefix.length)) || client.commands.get(client.aliases.get(cmd.slice(prefix.length)))
	if (commandfile) commandfile.run(client, message, args)
})

//client1.post('statuses/update', {status: 'E'},  function(error, tweet, response) {
 //   if(error) throw error;
   // console.log(tweet);  // Tweet body.
  //  console.log(response);  // Raw response object.
 // });
client.login(token)


//    access_token_key: "1252586429588426752-MOjZgoNhLmrPvkVelYKCzCVbICE5z1",
//access_token_secret: "Yc7JhAusq5H03cyQdcX0lE3B55cwyDW7xwHtvluGjpSBV"