const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
//const dados = require("./Db/contatos.json");
const dados = require("./Tests/fiscal.json")  // Json para testes
const { transcribeAudio } = require('./controller/transcribeAudio.js');
const { steps } = require('./controller/steps.js');
const { userStates } = require('./controller/userStateManager.js');

// Inicializa o cliente do WhatsApp
const client = new Client({
    authStrategy: new LocalAuth() // Salva a sessão localmente
});

// Gera o QR Code no terminal
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

// Quando estiver pronto, exibe uma mensagem
client.on('ready', () => {
    console.log('Client is ready!');
});

const handleIncomingMessage = async (client, message) => {
    const chatUser = {
        chatId: message.from,
        userMessage: message.body,
    };

    console.log(`Mensagem recebida de ${chatUser.chatId}: ${message.type}`);
    const value = dados.find(item => item.Id === chatUser.chatId);
    
    // Verifica se a mensagem é texto ou áudio
    try{
        if(message.hasMedia && !chatUser.chatId == "status@broadcast"){
            transcribeAudio(chatUser.chatId,client,message);
        }
        if(message.body){
            steps(chatUser.chatId,client,value,message);
        }  
    } catch (error) {
        await client.sendSeen(chatUser.chatId);
    }
};

// Assinatura do evento de mensagem
client.on('message', async (message) => {
    const chatId = message.from;
    if(userStates[chatId]){
        await userStates[chatId];
    }
    await handleIncomingMessage(client, message);
});

// Inicializa o cliente
client.initialize();