const { ReportarSmartPhone } = require("./reportarSmartPhone.js");
const { atendimentoEspecializado } = require('../Service/atendimentoEspecializado.js');
const { regraCombustivel } = require('../controller/RegraComubstivel.js');
const { solicitaEpi } = require("./solicitaEpi.js");
const { ReportarMoto } = require('./reportarMoto.js');


async function saudacao(chatId,client,nome){
    return await client.sendMessage(chatId,`Olá ${nome}, como posso ajuda?\n
    *1* - Solicitar combustível\n 
    *2* - Solicitar EPI \n 
    *3* - Reportar Icidente/Acidente\n 
    *4* - Reportar celular\n 
    *5* - Outros`);
}

async function switchOption(client,chatId,placa,nome,value){
    var value = parseInt(value,10);
    try{
        switch (value){
            case 1:
                return await regraCombustivel(chatId,client,placa, nome);
            case 2:
                return await solicitaEpi(chatId,client,nome);
            case 3:
                return await ReportarMoto(chatId,client,placa);
            case 4:
                return await ReportarSmartPhone(chatId, client, placa);
            case 5:
                return await atendimentoEspecializado(chatId, client, placa, nome)
            default:
                return await client.sendMessage(chatId,"Opção não localizada")
        }
    } catch (error){
        console.error("Error: ", error)
    }
}


module.exports = {
    saudacao,
    switchOption
};