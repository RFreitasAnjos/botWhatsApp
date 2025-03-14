const { solicitacombustivel } = require("../Service/solicitaCombustivel.js");

// Regra de negócio para solicitação do combustível
async function regraCombustivel(chatId, client, placa, nome,currentDate = new Date()) {
    const date = new Date(currentDate);
    const day = date.getDate();
    const dayOfWeek = date.getDay(); // 0 = Domingo, 6 = Sábado
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const value = 50;
    // Se for final de semana, retorna sem atualizar crédito
    if (isWeekend) {
        return await client.sendMessage(chatId,"O crédito não é atualizado aos finais de semana.");
    }
    // Lógica de atualização do crédito
    switch (true) {
        case day >= 20 && day <= 23:
            return solicitacombustivel(chatId, client,placa,value);

        case day >= 24 && day <= 28:
        case day >= 29 && day <= 31:
            var daysPassed = day - 25;
            var calculo = Math.max(0, value - daysPassed * 5)
            return solicitacombustivel(chatId,client,placa,calculo);

        default:
            var primeiroNome = nome.split(" ") 
            return await client.sendMessage(chatId,`${primeiroNome[0]} Aguarde, um dos nossos operadores irá entrar em contato.`);
    }
}

module.exports = {
    regraCombustivel,
}