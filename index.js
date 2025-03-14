const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
//const dados = require("./Db/contatos.json");
const dados = require("./Tests/fiscal.json")  // Json para testes
const { switchOption, saudacao } = require('./Service/service.js');


// Inicializa o cliente do WhatsApp
const client = new Client({
    authStrategy: new LocalAuth() // Salva a sessão localmente
});

const userStates = {};
const timeouts = {};
const lastInteraction = {};
const TIMEOUT_DURATION = 1 * 60 * 1000;


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

    if (value) {
        if (!userStates[value.Id]) {
            userStates[value.Id] = { step: 0 };
        }
        
        let userStep = userStates[value.Id].step;

        resetUserTimeout(chatUser.chatId, client);

        if (userStep === 0) {
            await saudacao(chatUser.chatId, client, value.Fiscal);
            userStates[value.Id].step = 1;
            return;
        }
        
        if (userStep === 1) {
            await switchOption(client, message.from, value.Placa, value.Fiscal, chatUser.userMessage);
            userStates[value.Id].step = 2;
            return;
        }
    }
};

function resetUserTimeout(chatId, client) {
    lastInteraction[chatId] = Date.now();
    
    if (timeouts[chatId]) {
        clearTimeout(timeouts[chatId]);
    }
    
    timeouts[chatId] = setTimeout(() => {
        checkUserInactivity(chatId, client);
    }, TIMEOUT_DURATION);
}

function checkUserInactivity(chatId, client) {
    if (Date.now() - lastInteraction[chatId] >= TIMEOUT_DURATION) {
        clearUserState(chatId, client);
        restartUserInstructions(chatId);
    } else {
        resetUserTimeout(chatId, client);
    }
}

function clearUserState(chatId, client) {
    console.log(`⏳ Resetando estado do usuário ${chatId} por inatividade.`);
    client.sendMessage(chatId, "Por inatividade estamos encerrando a conversa.");
    delete userStates[chatId];
    delete timeouts[chatId];
    delete lastInteraction[chatId];
}

function restartUserInstructions(chatId) {
    console.log(`🔄 Reiniciando instruções para o usuário ${chatId}.`);
    userStates[chatId] = { step: 0 };
}

// Assinatura do evento de mensagem
client.on('message', async (message) => {
    await handleIncomingMessage(client, message);
});

// Inicializa o cliente
client.initialize();
