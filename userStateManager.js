const { TIMEOUT_DURATION, WARNING_DURATION } = require('./config');

const userStates = {};
const timeouts = {};
const lastInteraction = {};

async function resetUserTimeout(chatId, client) {
    lastInteraction[chatId] = Date.now();

    if (timeouts[chatId]) {
        clearTimeout(timeouts[chatId]);
    }

    timeouts[chatId] = setTimeout(() => {
        warnUserInactivity(chatId, client);
    }, TIMEOUT_DURATION - WARNING_DURATION);
}

async function warnUserInactivity(chatId, client) {
    await client.sendMessage(chatId, "⚠️ Você está inativo. A conversa será encerrada em 30 segundos.");

    timeouts[chatId] = setTimeout(async () => {
        await clearUserState(chatId, client);
    }, WARNING_DURATION);
}

async function clearUserState(chatId, client) {
    console.log(`⏳ Resetando estado do usuário ${chatId} por inatividade.`);
    await client.sendMessage(chatId, "⏳ Por inatividade, estamos encerrando a conversa.");
    delete userStates[chatId];
    delete timeouts[chatId];
    delete lastInteraction[chatId];
}

async function restartUserInstructions(chatId) {
    console.log(`🔄 Reiniciando instruções para o usuário ${chatId}.`);
    userStates[chatId] = { step: 0 };
}

module.exports = {
    userStates,
    resetUserTimeout,
    clearUserState,
    restartUserInstructions
};
