const Discord = require('discord.js');

exports.run = async (client, message, args) => {
	//Armazena o que a pessoa escreveu após o comando
	var string = args.join(" ");
	//Armazena o nome das cores e os ids das cores
	var colors = [
		{name:"vermelho", id:"799071216429695016"},
		{name:"azul", id:"799071348122976306"},
		{name:"verde", id:"799071404549079090"},
		{name:"amarelo claro", id:"799073479261552680"}
	];
	//Mapea a informação name dentro do objeto colors
	var names = colors.map(function(item) {
		return item["name"].toLowerCase();
	});
	//Mapea os ids dentro do objeto colors
	var ids = colors.map(function(item) {
		return item["id"];
	});
	//procura se o conteudo da mensagem existe como um cargo no servidor
	var role = message.guild.roles.cache.find(r => r.name.toLowerCase() === string.toLowerCase());
	//Verifica se a pessoa escreveu algo na frente do comando
	if(!args[0]) return message.channel.send(`${message.author} escreva o nome da cor após o comando!`);
	//Se a pessoa escreveu remove após o comando, vai remover todos os cargos de cores
	else if(args[0].toLowerCase() === 'remove') { 
		await message.member.roles.remove(ids);
		return await message.channel.send(`${message.author} suas cores foram resetadas ao padrão!`);
	} 
	//verifica se o cargo existe no servidor e se está entre os permitidos pelo comando
	else if(!names.includes(string.toLowerCase()) || !role) return message.channel.send(`${message.author} não existe a cor com o nome ${string} neste servidor discord.`);
	else {
		try { //Tenta remover os cargos de cores do usuario para não empilhar cargos e depois adicionar a cor que ele deseja
			await message.member.roles.remove(ids);
			await message.member.roles.add(role);
			return await message.channel.send(`${message.author} agora você ganhou a cor ${string}`);
		} catch (err) {
			console.log("Erro: " + err);
		}
	}
};