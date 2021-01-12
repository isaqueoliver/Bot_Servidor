const Discord = require('discord.js');

exports.run = async (client, message, args) => {
	//Criação de um array com os links de gifs que ele vai jogar quand o comando for requerido
	var list = [
		'https://imgur.com/W53Gju2.gif',
		'https://imgur.com/W53Gju2.gif',
		'https://imgur.com/W53Gju2.gif',
		'https://repl.it/@Hieribu/BotServidor#giphy.gif' //foi uma chamada local de um gif upado
	];
	//Criação de um numero random pelas possibilidades dentro do array
	var rand = list[Math.floor(Math.random() * list.length)];

	//checa se a menção de usuario passado pelo que está usando o comando existe
	let user = message.mentions.users.first() || client.users.cache.get(args[0]);
	if(!user) return message.reply('lembre-se de mencionar um usuario valido para beijar!');

	//O envio da mensagem requerida pelo comando, sendo um envio de uma mensagem simples
	//message.channel.send(`${message.author.username} **acaba de beijar** ${user.username}! :heart:`, {files: [rand]});

  //O envio da mensagem requerida pelo comando, sendo um envio de uma mensagem embed
  //Armazenado o avatar do usuario que escreveu o comando
  let avatar = message.author.displayAvatarURL({format: "png"});
  //Criação de uma mensagem Embed
  const embed = new Discord.MessageEmbed().setTitle('Kiss').setColor('#000000').setDescription(`${message.author} acaba de beijar ${user}`)
                                          .setImage(rand).setTimestamp().setThumbnail(avatar).setFooter('Suprise!').setAuthor(message.author.tag, avatar);
  await message.channel.send(embed);
};