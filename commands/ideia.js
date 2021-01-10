const Discord = require("discord.js");

exports.run = async (client, message, args) => {
	//Apaga o comando do usuario
	message.delete();
	//Armazena o conteudo do comando na constante
	const content = args.join(" ");
	
	//Se a pessoa escrever nada após o comando o bot vai alertar
	if(!args[0]){
		return message.channel.send(`${message.author.username}, escreva a sugestão após o comando `);
	}//Se for maior que 1000 caracteres vai retornar um erro de que não pode ser maior do que isso
	else if(content.length > 1000){
		return message.channel.send(`${message.author.username}, forneça uma sugestão de no máximo 1000 caracteres`);
	} else {
		//procura se tem um canal com o determinado id
		var canal = message.guild.channels.cache.find(ch => ch.id === "587157777009344532");
		const msg = await canal.send(
			new Discord.MessageEmbed().setColor("#FFFFF1")
			.addField("Autor: ", message.author).addField("Conteúdo", content)
			.setFooter("ID do Autor: " + message.author.id).setTimestamp()
		);
		//O bot vai mandar mensagem no canal que a pessoa usou o comando
		await message.channel.send(`${message.author} a mensagem foi enviada com sucesso!`);

		//Uma constante que vai armazenas os emojis onde os usuarios podem votar para sim ou não
		const emojis = ["✅", "❎"];

		for(const i in emojis){
			await msg.react(emojis[i]);
		}
	}
}