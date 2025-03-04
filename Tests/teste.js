const emailjs = require("@emailjs/browser");
const { Client } = require("whatsapp-web.js");
const axios = require("axios");
const { CreditManager } = require("../regrasDeNegocio");
const { reportSmartPhone } = require("../controller/infoCondutor");
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
    }).then(res => client.sendMessage(chatId,"Enviado, o tempo estimado para créditar no cartão é de 2 horas"))
    .catch(err => client.sendMessage(chatId,"Falha ao realizar a solicitação. Aguarde retorno do suporte"));
    
}

// Solicitação de combustível via e-mail
async function solicitacombustivel(chatId, placa, client) {
  const creditManager = new CreditManager(50);
  const valor = creditManager.updateCredit();

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


async function solicitaEPI(chatId,client,nome){
  return client.sendMessage(chatId,"Aguarde contato do suporte.")
}

async function ReportarMoto(chatId,client,placa,nome){
  return client.sendMessage(chatId, "Aguarde contato do suporte.")
}
async function ReportarSmartPhone(chatId,client,placa,nome){
  return client.sendMessage(chatId, "Aguarde contato do suporte.")
}

async function other(chatId,client,nome){
  return client.sendMessage(chatId,"Aguarde contato do suporte.")
}


// Exporta a função
module.exports = {
  solicitacombustivel,
  solicitaEPI,
  ReportarMoto,
  ReportarSmartPhone,
  other,
};
