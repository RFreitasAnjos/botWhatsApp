const { switchOption, saudacao } = require('../Service/service');
const { userStates, resetUserTimeout } = require('../userStateManager');
const dados = require("../Tests/fiscal.json");

async function handleIncomingMessage(client, message) {
    const chatUser = {
        chatId: message.from,
        userMessage: message.body.trim(),
    };

    console.log(`📩 Mensagem recebida de ${chatUser.chatId}: ${chatUser.userMessage}`);
    const value = dados.find(item => item.Id === chatUser.chatId);

    if (!value) {
        return;
    }

    if (!userStates[value.Id]) {
        userStates[value.Id] = { step: 0 };
    }

    let userStep = userStates[value.Id].step;

    await resetUserTimeout(chatUser.chatId, client);

    switch (userStep) {
        case 0:
            await saudacao(chatUser.chatId, client, value.Fiscal);
            userStates[value.Id].step = 1;
            break;
        case 1:
            await switchOption(client, message.from, value.Placa, value.Fiscal, chatUser.userMessage);
            userStates[value.Id].step = 2;
            break;
        default:
            await client.sendMessage(chatUser.chatId, "❓ Comando não reconhecido.");
    }
}

module.exports = {
    handleIncomingMessage
};
