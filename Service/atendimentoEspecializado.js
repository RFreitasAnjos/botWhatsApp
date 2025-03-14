async function atendimentoEspecializado(chatId,client,nome){
    return client.sendMessage(chatId,`Aguarde contato do suporte.`);
}

module.exports = {
    atendimentoEspecializado,
}