const warn = require("../database/Mod/warn")
module.exports.run = async(client, message, args, Discord, MessageEmbed) => {
  let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])

if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`<a:check_no:756349337289883708> **|** ${message.author} no tienes permisos de ***ADMINISTRADOR*** para realizar esta accion.`).then(m=>{m.delete({timeout: 10000})})
if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send(`<a:check_no:756349337289883708> **|** ${message.author} no tengo permisos de ***Banear Miembros*** para realizar esta accion.`).then(m=>{m.delete({timeout: 10000})})
if(!user) return message.channel.send(`<a:check_no:756349337289883708> **|** ${message.author} debes mencionar o proporciomar la **ID** de la persona a warnear.`).then(m=>{m.delete({timeout: 10000})})
if(user.id === message.author.id) return message.channel.send(`<a:check_no:756349337289883708> **|** ${message.author} ¿Piensas warnearte a ti mismo? menciona a otra persona.`).then(m=>{m.delete({timeout: 10000})})
if(user.id === client.id) return message.channel.send(`<a:check_no:756349337289883708> **|** ${message.author} No puedo warnearme, si tienes alguna queja, puedes realizarla con el comando: ***complain***`)
let c = await warn.findOne({sid: message.guild.id, user: user.id})
let razon = args.slice(1).join(" ")
let re;
if(!razon){re=`No se especifico ninguna razon`}else{re=razon}
if(!c){
  let msg = await message.channel.send(user, new MessageEmbed()
  .setTitle("<a:check_si:756349330041995385> [AKEMI WARN] <a:check_si:756349330041995385>")
  .addField("👤 [USUARIO]", user, true)
  .addField("👮‍♂ [MODERADOR]", message.author, true)
  .addField("♾ [RAZON]", re, true)
  .addField("♻ [CONTADOR WARNS]", "1", true)
  .addField("☸ [SERVIDOR]", message.guild.name, true)
  .setColor("RANDOM")
  .setFooter(message.guild.name, message.guild.iconURL())).then(async(m) => {
    m.delete({timeout: 15000})
    let nue = await new warn({sid: message.guild.id, user: user.id, userN: user.username, count: 1})
    nue.save()
  })
  user.send(msg)
}
let x = 1
    let suma = c.count + +x
let msg = await message.channel.send(user, new MessageEmbed()
  .setTitle("<a:check_si:756349330041995385> [AKEMI WARN] <a:check_si:756349330041995385>")
  .addField("👤 [USUARIO]", user)
  .addField("👮‍♂ [MODERADOR]", message.author)
  .addField("♾ [RAZON]", re)
  .addField("♻ [CONTADOR WARNS]", suma)
  .addField("☸ [SERVIDOR]", message.guild.id)
  .setColor("RANDOM")
  .setFooter(message.guild.name, message.guild.iconURL())).then(async(m) => {
    
    m.delete({timeout: 15000})
    let edit = await warn.updateOne({sid: message.guild.id, user: user.id}, {$set: {userN: user.username, count: suma}})
  })
  user.send(msg)
}