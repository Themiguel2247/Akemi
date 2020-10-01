module.exports.run = async(client, message, args, Discord, MessageEmbed) => {
    message.delete()
    if(message.author.id === "") return;
    let code = args.slice(0).join(" ")
    let evalu = eval(code)
  try {
    return message.channel.send(new MessageEmbed()
    .setTitle("[EVALUACION]")
    .addField("[ENTRADA]", "```js\n"+code+"```")
    .addField("[SALIDA]", "```js\n"+evalu+"```")
    .setColor("RANDOM"))
  } catch(e) {

  }
  }