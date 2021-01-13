const express = require('express');
const app = express();

app.get("/", (request, response) =>{
	const ping = new Date();
	ping.setHours(ping.getHours() - 3);
	console.log('Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}');
	response.sendStatus(200);
});

//Recebe solicitações que o deixa online
app.listen(process.env.PORT);

//Conexão com a livraria do Discord
const Discord = require("discord.js");

//Criação de um novo Client
const client = new Discord.Client();

//pegando o prefixo do bot para respostas de comandos
const config = require("./config.json");

//Comando que vai mandar uma mensagem quando uma pessoa nova entrar no canal
client.on("guildMemberAdd", async (member) => { 
	let guild = await client.guilds.cache.get("587153202969837590"); //Busca o id do servidor
	let channel = await client.channels.cache.get("587157777009344532"); //Busca o id do canal
	let emoji = await member.guild.emojis.cache.find(emoji => emoji.name === "nomedoemoji"); //Armazena um emoji presente no canal
	//Se o servidor que a gente buscou com o guild for diferente que o servidor que o usuario entrou
	//Isso evita que membros que entram em outros servidores que também usam esse bot, não notifique no seu servidor
	if (guild != member.guild) return console.log('Você não é do servidor respectivo desse bot');

	else {
		//Se entrou no servidor correto
		let embed = await new Discord.MessageEmbed().setColor("#7c2ae8").setAuthor(member.user.tag, member.user.displayAvatarURL())
					.setTitle(`${emoji} Boas-vindas ${emoji}`).setImage("https://thumbs.gfycat.com/LastVariableGreathornedowl-small.gif")
					.setDescription(`**${member.user}**, bem-vindo(a) ao servidor **${guild.name}**! Atualmente estamos com **${member.guild.memberCount} membros**, divirta-se conosco! :heart:`)
					.setThumbnail(member.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 })) //coloca o avatar do usuario de maneira destacada como thumbnail
					.setFooter('ID do usuário: ' + member.user.id).setTimestamp();

		channel.send(embed);
	}
});

//Um evento do tipo message que é ativado quando uma mensagem é enviada no chat
client.on('message', async message => {
  //Ignora mensagens vindas de outros bots
     if (message.author.bot) return;
     //Ignora mensagens vindas de dm
     if (message.channel.type == 'dm') return;
     //Ignora mensagens que não sejam iniciadas pelo prefixo
     if (!message.content.toLowerCase().startsWith(config.prefix.toLowerCase())) return;
     //Não responder se a menção feita é pelo id do bot
     if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) return;

    const args = message.content
        .trim().slice(config.prefix.length)
        .split(/ +/g);
    const command = args.shift().toLowerCase();

    try {
        const commandFile = require(`./commands/${command}.js`);
        commandFile.run(client, message, args);
    } catch (err) {
    console.error('Erro:' + err);
  }
});
//Um evento do tipo 'ready' que vai ser ativado quando o bot for ativado
client.on("ready", () => {
  //Os estados em que o bot vai ser trocado
  let activities = [
      `Utilize ${config.prefix}help para obter ajuda`,
      `${client.guilds.cache.size} servidores!`,
      `${client.channels.cache.size} canais!`,
      `${client.users.cache.size} usuários!`
    ],
    //Aqui é configurado o i que vai correr o array de activities trocando os status do bot, isso occorre incrementando o valor de i a cada X segundos
    i = 0;
  setInterval( () => client.user.setActivity(`${activities[i++ % activities.length]}`, {
        type: "WATCHING" //WATCHING, LISTENING, PLAYING, STREAMING
      }), 1000 * 60); 
      //Aqui é configurado o status que o bot vai ficar, se ele ta disponivel, ocupado, offline, etc. No caso ele ta "Não pertubar"
  client.user
      .setStatus("dnd") //idle, dnd, online, invisible
      .catch(console.error);//Se tiver dado algum erro vai ser notificado
      //vai informar quando estiver online
  console.log("Estou Online!")
});

//Ligando o bot caso ele consiga acessar o token
client.login(process.env.TOKEN);