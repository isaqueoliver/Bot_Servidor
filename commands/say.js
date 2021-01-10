//Comando que apaga a mensagem que o usuario introduz e subtitui o que ele fala para como se fosse o bot falando

const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
  const sayMessage = args.join(' ');
  message.delete().catch(O_o => {});
  message.channel.send(sayMessage);
};