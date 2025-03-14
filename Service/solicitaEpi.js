async function solicitaEpi(chatId, client, nome){
    // Alternativa momentanea
    const link = "https://www.google.com";
    return await client.sendMessage(chatId, "Clique no link abaixo e informe quais itens você precisa:\n" + link);
}

module.exports = {
    solicitaEpi,
}