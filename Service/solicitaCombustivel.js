// Bloco de código que faz a requisição para enviar e-mail
// dataCombustível mantém as informações necessárias para realizar o envio do e-mail
const { sendEmail } = require("../Tests/conexaoEmail")

async function solicitacombustivel(chatId, client, placa, valor) {
    const dataCombustivel = {
      service_id: "service_k8q8jul",
      template_id: "template_r6j65b3",
      user_id: process.env.EMAILJS_PUBLIC_KEY,
      template_params: {
        valor: valor,
        placa: placa,
      },
    };
    return sendEmail(chatId,dataCombustivel,client)
}

module.exports = {
    solicitacombustivel,
}