const { processMessage } = require("./IA");

async function atendimentoEspecializado(chatId,client,nome,placa){
    var primeiroNome = nome.split(" ")[0];
    await client.sendMessage(chatId,`Olá ${primeiroNome}, no que posso ser útil?`);
    //await processMessage(chatId,client,nome,placa,resposta);
}

module.exports = {
    atendimentoEspecializado,
}