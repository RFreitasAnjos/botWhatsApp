const fs = require('fs');
const path = require('path');
const { userStates } = require('../controller/userStateManager.js');
const { MessageMedia } = require('whatsapp-web.js');

async function solicitarDocumento(chatId, client, nome, placa,message) {
    return await documentoMotoPrincipal(chatId,client,nome,placa,message);
    // await client.sendMessage(chatId, "*1* - Documento da moto principal\n*2* - Digite a placa da moto que você se encontra no momento");
    
    // userStates[chatId] = async (chatId,value,client) => {
    //     var primeiroNome = nome.split(" ")[0];
    //         if (value === "1") {
    //             await documentoMotoPrincipal(chatId, client, primeiroNome, placa);
    //         } else if (value.body === "2") {
    //             await client.sendMessage(chatId, "Digite a placa da moto reserva:");
    //             userStates[chatId] = async (chatId,placaReserva, client) => {
    //                 const regexPlaca = /^[A-Z]{3}\d[A-Z]\d{3}$/;
    //                 if (regexPlaca.test(placaReserva.toUpperCase())) {
    //                     await documentoMotoReserva(chatId, client, primeiroNome, placaReserva);
    //                 } else {
    //                     await client.sendMessage(chatId, "⚠️ Placa inválida. Certifique-se de que está no formato correto (ABC1D234).");
    //                 }
    //                 delete userStates[chatId];
    //             };
    //         } else {
    //             await client.sendMessage(chatId, "⚠️ Opção inválida. Escolha 1 ou 2.");
    //         }
    //     };
    }

async function documentoMotoPrincipal(chatId, client, primeiroNome, placa,message) {
    try{
        const media = await caminhoDocumento(placa);
        await client.sendMessage(chatId,"Segue documento do veículo.");
        await client.sendMessage(chatId,media);
    } catch ( error ) {
        await client.sendMessage("Aguarde o contato do suporte.")
    }
}

function caminhoDocumento(placa){
    try{
        const caminho = `CRLVDigital_${placa}_2024.pdf`;
        const filePath = path.join(__dirname, '../Assets/CRLVs 2024', caminho);
        const media = MessageMedia.fromFilePath(filePath);
        return media;
    } catch (error){
        console.error("Erro ao caarregar o documento: ",error);
    }
}

async function documentoMotoReserva(chatId, client, primeiroNome, placa) {
    var filePath = caminhoDocumento(placa)
    return await client.sendMessage(chatId, `${primeiroNome}, segue documento da moto reserva: CRLVDigital_${placa}_2024.pdf` + filePath);
}

module.exports = {
    solicitarDocumento
}