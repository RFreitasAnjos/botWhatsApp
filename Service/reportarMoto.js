const { solicitarDocumento } = require('../Modules/documentoMoto.js')
const { informarQuilometragem } = require('../Model/moto.js');
// Alternativa momentânea
async function menuMoto(chatId,client,nome,placa){
    var primeiroNome = nome.split(" ")[0];
    await client.sendMessage(chatId, `${primeiroNome}, escolha o tipo de atendimento\n
        *1* - Informar KM\n
        *2* - Documento da moto\n
        *3* - Reportar Quebra/Pneu\n
        *4* - Reportar Incidente/Sinistro\n
        *5* - Solicitar Suporte Técnico`);
        client.on('message', async(message) =>{
            return await opcoesMoto(chatId,client,nome,placa,message.body);
        });
    };


// Função que trata as opções de atendimento da moto
async function opcoesMoto(chatId, client, nome, placa, value) {    
    var option = parseInt(value, 10);
    try{
        switch (option) {
            case 1:
                return await informarQuilometragem(chatId, client,nome, placa);
            case 2:
                return await solicitarDocumento(chatId,client, nome, placa, value);
            case 3:
                return await client.sendMessage(chatId,"Aguarde, um dos nossos operadores entrará em contato.");
                break;
            case 4:
                //return await reportarIncidente(chatId, client);
            case 5:
                //return await solicitarSuporteTecnico(chatId, client);
            default:
                return await client.sendMessage(chatId, "⚠️ Opção inválida. Escolha uma das opções listadas.");
        }
    } catch ( error ){
        console.error("Error: ", error);
        await client.sendMessage(chatId,"Aguarde contato do nosso suporte");
    }    
    // } finally {
    //     client.on('message', async(message) => {
    //          // TODO: Tentar implementar o próximo; 
    //     });
    // }
    
}

module.exports = {
    menuMoto,
    opcoesMoto,
};
