const emailjs = require("@emailjs/browser");
const axios = require("axios");
require("dotenv").config();
// Inicializa o EmailJS corretamente
async function init() {
  await emailjs.init({
    publicKey: process.env.EMAILJS_PUBLIC_KEY, // Certifique-se de que esta chave é correta
  });
}
// Função para enviar e-mail usando EmailJS
async function sendEmail(chatId,data,client) {
    const response = await axios.post("https://api.emailjs.com/api/v1.0/email/send", data, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": process.env.EMAILJS_PRIVATE_KEY,
      },
    }).then(res => client.sendMessage(chatId,"Enviado, o tempo estimado para creditar no cartão são de 2 horas"))
    .catch(err => client.sendMessage(chatId,"Falha ao realizar a solicitação. Aguarde retorno do suporte"));
    //TODO: encerrar script aqui e resetar chat.
      
}

// Exporta a função
module.exports = {
  sendEmail,
};
