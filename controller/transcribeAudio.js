const { timeStamp } = require('console');
const fs = require('fs');
const path = require('path');

// TODO: Fazer lógica para transcrever áudio para texto
async function transcribeAudio(chatId,client,message){
    const luzIA = '5511972553036@c.us';
    try{
        const media = await message.downloadMedia();
        const filePath = path.join(__dirname,'../Assets/audio','temp.ogg');
        fs.writeFileSync(filePath,media.data,'base64');

        await client.sendMessage(luzIA,media);

        fs.unlinkSync(filePath);
        console.log('deleted', filePath)
        // TODO : Criar uma lógica para retornar o mensagem da IA
        //return await message.forward(chatId);
    } catch ( error ){
        return await client.sendMessage(chatId,"Aguarde o retorno do suporte.")
    }
}

module.exports = {
    transcribeAudio,
}