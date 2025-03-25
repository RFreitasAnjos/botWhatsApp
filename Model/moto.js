class Moto{
    constructor(placa,quilometragem,documento){
        this.placa = placa;
        this.quilometragem = quilometragem;
        this.documento = documento;
    }
}


async function informarQuilometragem(chatId,client,nome,placa){
    return await client.sendMessage(chatId,"Aguarde o contato do suporte");
}

module.exports = {
    informarQuilometragem,
}
