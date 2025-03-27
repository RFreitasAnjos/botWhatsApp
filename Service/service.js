const { ReportarSmartPhone,solicitaEpi } = require("./reportarSmartPhone.js");
const { atendimentoEspecializado } = require('../Service/atendimentoEspecializado.js');
const { regraCombustivel } = require('../controller/RegraCombustivel.js');
const { menuMoto } = require('./reportarMoto.js');
const { fiscal, incidenteAcidente } = require('../Model/fiscal.js');

async function saudacao(chatId,client,nome){
    var primeiroNome = nome.split(" ")[0];
    return await client.sendMessage(chatId,`Olá *${primeiroNome}*, Para que possamos direcioná-lo da melhor forma possível, por favor, selecione a opção que melhor descreve o motivo do seu contato\n
    *1* - Solicitar combustível *(Esse meio só está disponível após o dia 20 de cada mês.)*\n 
    *2* - Solicitar EPI's (*Joelheiras*, *Cotoveleiras*, *Balaclava*, *Manguito*, *Bota*, *Capacete*...) \n 
    *3* - Moto (*Solicitar Documento*, *Informar Quilometragem*, *Notificar Quebra*)\n 
    *4* - Fiscal (*Incidente/Acidente*)\n 
    *5* - *Outros*\n

Em breve, daremos início ao seu atendimento.\n

Atenciosamente,\n
*TPF ENGENHARIA/CCO EMLURB*`);
}

async function menu(chatId,client,nome,placa,value){
    var value = parseInt(value,10);
    try{
        switch (value){
            case 1:
                return await regraCombustivel(chatId,client,placa, nome);
            case 2:
                return await solicitaEpi(chatId,client,nome);
            case 3:
                return await menuMoto(chatId, client, placa, nome,value);
            case 4:
                return await incidenteAcidente(chatId, client, nome, placa);
            case 5:
                return await atendimentoEspecializado(chatId, client, nome, placa);
            default:
                return await client.sendMessage(chatId,"Opção não localizada");
        }
    } catch (error){
        console.error("Error: ", error)
    }
}


module.exports = {
    saudacao,
    menu
};