const Discord = require("discord.js");

exports.run = async (client, message, args) => {
	//se a pessoa não tem a permissão passada, ela não vai poder usar o comando
	if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.reply("Você não tem a permissão Gerenciar Mensagens necessaria para usar esse comando!");
	//Checar o primeiro argumento, no caso o numero que a pessoa mandou e converter para a base de 10
	const deleteCount = parseInt(args[0], 10);
	//Caso ele não não tenha passado um numero ou caso esse numero for menor do que 1 ou maior do que 100
	if(!deleteCount || deleteCount < 1 || deleteCount > 99) return message.reply("Forneça um número de até 99 mensagens a serem excluidas!");
	//O bot vai procurar no chat as mensagens para serem apagar e somado +1 para que a mensagem do usuario que acabou de mandar tambem seje apagada
	const fetched = await message.channel.messages.fetch({ limit: deleteCount + 1 });
	//Aqui o bot vai apagar as mensagens
	message.channel.bulkDelete(fetched);
  message.channel
    //Manda uma mensagem de report para o usuario de quantas foram limpas e se a apaga depois de alguns segundos
    .send(`**${args[0]} mensagens limpas nesse chat!**`).then(msg => msg.delete({timeout: 5000}))
    .catch(error =>
      console.log(`Não foi possível deletar mensagens devido a: ${error}`) //Vai mandar o erro se existir algum
    );
};