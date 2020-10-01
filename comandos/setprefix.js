const prefixModel = require("../database/Configuraciones/prefix")
module.exports.run = async(client, message, args, Discord, MessageEmbed) => {
  if(message.deletable) message.delete()
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`<a:check_no:756349337289883708> **||** ${message.author} no tienes permisos de **administracion** para realizar esta configuracion.`).then(m => {m.delete({timeout: 10000})})
  let prefix = args[0]
  if(!prefix) return message.channel.send(`<a:check_no:756349337289883708> **|** ${message.author} debes de colocar un nuevo prefix`).then(m => {m.delete({timeout: 10000})})
  if(prefix.length > 3) return message.channel.send(`<a:check_no:756349337289883708> **|** ${message.author} el prefix no debe contener mas de 3 caracteres`).then(m => {m.delete({timeout: 10000})})
  if(prefix.length == "a.") return message.channel.send(`<a:check_no:756349337289883708> **|** ${message.author} el prefix ingresado viene por defecto, si quieres restablecerlo usa el comando **<prefix>resetprefix**`)
  let consulta = await prefixModel.findOne({sid: message.guild.id})
  if(!consulta){
    let es = await new prefixModel({sid: message.guild.id, prefix: prefix})
    es.save()
  return message.channel.send(message.author, new MessageEmbed()
  .setTitle("<a:check_si:756349330041995385> [PREFIX GUARDADO] <a:check_si:756349330041995385>")
  .setDescription(`<a:HyperTada:756352320559775785> ¡Felicidades! **|** Ahora el servidor **${message.guild.name}** tiene el prefix **${args[0]}**`)
  .setColor("RANDOM")
  ).then(m => {m.delete({timeout: 10000})})
  }
   if(prefix === consulta.prefix) return message.channel.send(`<a:check_no:756349337289883708> **|** ${message.author} el prefix que ingresastes es el actual prefix en este servidor.`).then(m => {m.delete({timeout: 10000})})
  let edit = await prefixModel.updateOne({sid: message.guild.id}, {$set: {prefix: prefix}})
  return message.channel.send(message.author, new MessageEmbed()
  .setTitle("<a:check_si:756349330041995385> [PREFIX EDITADO] <a:check_si:756349330041995385>")
  .setDescription(`<a:HyperTada:756352320559775785> ¡Felicidades! **|** Ahora el servidor **${message.guild.name}** tiene el prefix **${args[0]}**`)
  .setColor("RANDOM")
  ).then(m => {m.delete({timeout: 10000})})
}