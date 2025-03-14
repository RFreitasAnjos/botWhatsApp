// Alternativa momentanea
async function ReportarMoto(chatId,client,placa,nome){
    return client.sendMessage(chatId, `Aguarde contato do suporte.`);
}

module.exports = {
    ReportarMoto,
}