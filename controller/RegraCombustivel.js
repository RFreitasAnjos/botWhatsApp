const { solicitacombustivel } = require("../Service/solicitaCombustivel.js");

// Regra de negócio para solicitação do combustível
async function regraCombustivel(chatId, client, placa, nome,currentDate = new Date()) {
    const date = new Date(currentDate);
    const day = date.getDate();
    const dayOfWeek = date.getDay(); // 0 = Domingo, 6 = Sábado
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    var value = 50;
    // Se for final de semana, retorna sem atualizar crédito
    if (isWeekend) {
        return await client.sendMessage(chatId,"Operação de recarga não é autorizada aos finais de semana.");
    }
    // Lógica de atualização do crédito
    if (day >= 24 && day <= 28) {
        value = 40;
        return solicitacombustivel(chatId, client, placa, value);
    } else if (day >= 29 && day <= 31){
        value = 30;
        return solicitacombustivel(chatId, client, placa, value);
    } else if (day >= 20 && day <= 23) {
        return solicitacombustivel(chatId, client, placa, value);
    } else {
        const primeiroNome = nome.split(" ")[0];
        return await client.sendMessage(chatId, ` ${primeiroNome}, aguarde, um operador entrará em contato.`);
    }
    
}

module.exports = {
    regraCombustivel,
}