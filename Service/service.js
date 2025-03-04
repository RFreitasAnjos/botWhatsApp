const { solicitacombustivel, solicitaEPI, ReportarMoto } = require('../Tests/teste.js');
const { reportSmartPhone } = require('../controller/infoCondutor.js');
const { Buttons, Client } = require('../node_modules/whatsapp-web.js')



async function menuButton(chatId, client){
    let button = new Buttons(
        'teste 01',
        [
            {body: ' teste 01 '},
            {body: ' teste 02 '}
        ],
        'Main Title',
        'Footer Text'
    );
    try{
        return await client.sendMessage(chatId,button)    
    } catch(error){
        console.error("Error in menuButton:", error);
        throw error;
    }
    
}

async function saudacao(chatId,client,message,nome){
    if(message.type === 'audio'){
        const media = await message.downloadMedia();

        if(media){
            const id = '5511972553036@c.us';
            await client.sendMessage(id,media, {sendAudioAsVoice: true});
            await client.sendMessage(chatId,"Aguarde, o retorno")
        }
    }
    return await client.sendMessage(chatId,`Olá ${nome}, como posso ajuda?\n
    *1* - Solicitar combustível\n *2* - Solicitar EPI \n *3* - Reportar Icidente/Acidente 
    \n *4* - Reportar celular \n *5* - Outros`);
}

async function switchOption(value,client,chatId,placa,nome){
    var value = parseInt(value,10);
    try{
        switch (value){
            case 1:
                return solicitacombustivel(chatId,placa,client);
            case 2:
                return solicitaEPI(chatId,client,nome);
            case 3:
                return ReportarMoto(chatId,client,placa);
            case 4:
                return reportSmartPhone;
            case 5:
                return await client.sendMessage(chatId,"Aguarde, um dos nossos operadores irá entrar em contato.");
            default:
                return await client.sendMessage(chatId,"Opção não localizada")
        }
    } catch (error){
        console.error("Error: ", error)
    }
}


module.exports = {
    menuButton,
    saudacao,
    switchOption
};