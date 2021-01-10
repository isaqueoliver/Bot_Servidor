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

//Ligando o bot caso ele consiga acessar o token
client.login(process.env.TOKEN);