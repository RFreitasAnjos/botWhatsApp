const { atendimentoEspecializado } = require('../Service/atendimentoEspecializado');
const { processMessage } = require('../Service/IA');
const { emailIncidenteAcidente } = require('../Service/incidenteAcidente');
// TODO: Implementar código para retornar apenas o primeiro nome

async function incidenteAcidente(chatId,client,nome,placa){
    await client.sendMessage(chatId,"Descreva o ocorrido para podermos dar início as tratativas.\n*(Envie em apenas uma mensagem ou um áudio)*");
    client.on('message', async (message) =>{
        const response = await processMessage(chatId,client,nome,placa,message);
        return await emailIncidenteAcidente(chatId,client,nome,placa,response);
    });
}

module.exports = {
    incidenteAcidente,
}