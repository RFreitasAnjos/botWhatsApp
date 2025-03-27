const moment = require('moment');
const axios = require('axios');

async function emailIncidenteAcidente(chatId, client, nome, placa, mensagem){
    const dataAtual = moment().format("DD/MM/YYYY");    
    const emailIncidenteAcidente = {
        service_id: "service_k8q8jul",
        template_id: "template_5io2qmh",
        user_id: process.env.EMAILJS_PUBLIC_KEY,
        template_params:{
            name: nome,
            date: dataAtual,
            placa: placa,
            text: mensagem,
        },
    };
    return await sendEmail(chatId,emailIncidenteAcidente,client)
}

async function sendEmail(chatId,data,client) {
    try{
        await axios.post("https://api.emailjs.com/api/v1.0/email/send", data, {
            headers: {
              "Content-Type": "application/json",
              "Authorization": process.env.EMAILJS_PRIVATE_KEY,
            },
        });
        await client.sendMessage(chatId,"Já reportamos ao RH, logo entraremos em contato para darmos continuidade a tratativa.")
    } catch ( error ) {
        await client.sendMessage(chatId,"Falha ao registrar o Incidente. Aguarde retorno do suporte");
    }
}


module.exports = {
    emailIncidenteAcidente,
}