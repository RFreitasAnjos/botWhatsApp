async function solicitaEpi(chatId, client, nome){
    // Alternativa momentanea
    const link = "https://forms.office.com/r/9JnELtN2mx";
    return await client.sendMessage(chatId, "Clique no link abaixo para preencher quais EPI's você precisa:\n" + link);
}

module.exports = {
    solicitaEpi,
}