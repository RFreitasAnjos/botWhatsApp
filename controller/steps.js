const { userStates,resetUserTimeout } = require('../controller/userStateManager.js');
const { menuMoto,opcoesMoto } = require('../Service/reportarMoto.js');
const { saudacao, menu } = require('../Service/service.js');

async function steps(chatId,client,value,message){
    if (value) {
        if (!userStates[value.Id]) {
            userStates[value.Id] = { step: 0 };
        }
        
        // 
        let userStep = userStates[value.Id].step;
        resetUserTimeout(chatId, client);

         if (userStep === 0) {
             await saudacao(chatId, client, value.Fiscal);
             userStates[value.Id].step = 1;
             return;
        }
        
        if (userStep === 1) {
            await menu(chatId,client,value.Fiscal,value.Placa, message.body);
            userStates[value.Id].step = 2;
            return;
        }
    }
}

module.exports = {
    steps,
}