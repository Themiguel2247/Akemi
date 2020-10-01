const express = require('express')
const app = express()
 
app.get('/', function (req, res) {
  res.send('Hello World')
})
 let port = process.env.PORT || 3000;
app.listen(port)
 
require('dotenv').config()
/////////////////////////////////
const Discord = require("discord.js")
const client = new Discord.Client();
const {MessageEmbed} = require("discord.js")
const config = require("./configuracion/config")
const prefixModel = require("./database/Configuraciones/prefix")
const dbtemp = require("./database/Mod/tempban")
const humanizeDuration = require("humanize-duration");
const inv = require("./database/Configuraciones/invitesc")
const prefix = config.prefix
client.login(config.token)
client.on('ready', () => {
	const rootdb = require("./configuracion/conected.js");
rootdb.then(() => console.log("tu bot conectado a MongoDB"))
    setInterval(() => {
		let activity = [`${client.users.cache.size} usuarios`, `${prefix}help`];
		let result = activity[Math.floor(activity.length * Math.random())];
		client.user.setActivity(result, { type: 'WATCHING' });
	}, 5000);
    console.log('Estoy Listo');
})
client.on('message', async(message)=> {
 
	///////////////////////////
	if (message.author.bot) return;
  let prefixS;
  let cp = await prefixModel.findOne({sid: message.guild.id})
  if(!cp){
prefixS = config.prefix
  }else{
prefixS = cp.prefix
  }
	
	if (!message.content.startsWith(prefixS)) return;
	const args = message.content
		.slice(prefixS.length)
		.trim()
		.split(/ +/g);

	const command = args.shift().toLowerCase();
	try {
		console.log(
			'[Historial]: ' +
				message.author.tag +
				" ejecuto el comando: '" +
				command +
				"'"
		);
		let commandFile = require(`./comandos/${command}.js`);
		commandFile.run(client, message, args, Discord, MessageEmbed);
	} catch (err) {
		console.log("[INFO]: '" + command + "' Ese comando no existe");
		console.error('[Historiales]: ' + err.message);
	}
})
client.on('guildMemberAdd', async(member) => {
let cinv = await inv.findOne({sid: member.guild.id})
if(!cinv){
  
}else{
let invites = await member.guild.fetchInvites()
let id = await invites.find(invite => invite.inviter)
 return console.log(invites.find(invite => invite.inviter.id))
  return member.guild.channels.cache.get(cinv.canalid).send(`${member} fue invitado por el usuario ${id}`)
}
})