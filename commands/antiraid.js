const Discord = require("discord.js");

exports.run = async (client, message, args) => {
	//Pesquisa e guardo o cargo pelo o id passado
	const role = await message.guild.roles.cache.find(r => r.id === "587153202969837590");
	const sender = message.author; //apensar armazenando a menção do autor
	
	//Criação de um filtro para quem pode utilizar o comando
	if(!message.member.roles.cache.some(r =>[
		"587155334020202532",
		"796918265984057365"
	].includes(r.id))) {
		return message.channel.send(`${sender} este comando é restrito!`);
	}
	//se a mensagem do usuario incluir on, entao ele vai ligar o sistema de antiraid
	else if(message.content.includes("on")) {
		await role.setPermissions(67109889);
		await message.channel.send(`O sistema de antiraid foi ligado por ${sender}`);
	}
	//se a mensagem do usuario for OFF, o sistema de antiraid vai ser desligado
	else if(message.content.includes("off")) { 
		await role.setPermissions(67111937);
		await message.channel.send(`O sistema de antiraid foi desligado por ${sender}`);
	} else {
		return message.channel.send(`${sender} a sintaxe correta é _bot antiraid on | off`);
	}
};