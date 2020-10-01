const prefixModel = require("../database/Configuraciones/prefix")
module.exports.run = async(client, message, args, Discord, MessageEmbed) => {
  if(message.deletable) message.delete()
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`<a:check_no:756349337289883708> **||** ${message.author} no tienes permisos de **administracion** para realizar esta configuracion.`).then(m => {m.delete({timeout: 10000})})
  let c = await prefixModel.findOne({sid: message.guild.id})
  if(!c){
    return message.channel.send(`<a:check_no:756349337289883708> **||** ${message.author} el servidor no tiene prefix personalizado, por lo tanto el predeterminado es: **a.**`).then(m => {m.delete({timeout: 10000})})
  }
  return message.channel.send(`<a:check_si:756349330041995385> **|** ${message.author} el prefix fue reseteado, ahora el prefix de este servidor es el que viene por defecto: **a.**`).then(async m => {
    m.delete({timeout: 10000})
    await prefixModel.deleteOne({sid: message.guild.id}).catch(e => {console.log(e)})
    })
}