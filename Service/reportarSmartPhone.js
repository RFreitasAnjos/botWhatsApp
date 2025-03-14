async function ReportarSmartPhone(chatId,client,placa,nome){
    return client.sendMessage(chatId, `Aguarde contato do suporte.`);
}

module.exports = {
    ReportarSmartPhone,
}
  