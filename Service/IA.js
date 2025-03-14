const axios = require('axios');
// Objeto para armazenar o histórico de conversas
const conversationHistory = {};

// Função para processar mensagens usando LM Studio com histórico
async function processMessage(text, userId,nome) {
    try {
        // Inicializa o histórico do usuário, se não existir
        if (!conversationHistory[userId]) {
            conversationHistory[userId] = [];
        }

        // Adiciona a mensagem do usuário ao histórico
        conversationHistory[userId].push({ role: "user", content: text });

        // Limita o histórico para as últimas 10 interações
        if (conversationHistory[userId].length > 10) {
            conversationHistory[userId].shift();
        }

        const response = await axios.post('http://localhost:1234/api/v0/chat/completions', {
            model: "deepseek-r1-distill-qwen-7b",
            messages: [
                { role: "system", content: `Atenda ${nome} de forma atenciosa e amigável, buscando auxiliar nas seguintes  situações` },
                ...conversationHistory[userId] // Envia o histórico completo do usuário
            ],
            temperature: 0.5,
            max_tokens: 500
        });

        let reply = response.data.choices[0].message.content;

        // Remove qualquer <think>...</think> antes de responder
        reply = reply.replace(/<think>[\s\S]*?<\/think>/g, '').trim();

        // Adiciona a resposta da IA ao histórico
        conversationHistory[userId].push({ role: "assistant", content: reply });

        console.log(`Resposta gerada para ${userId}: ${reply}`);
        return reply;

    } catch (error) {
        console.error('Erro ao processar mensagem:', error);
        return 'Desculpe, não consegui processar sua mensagem.';
    }
}

module.exports = {
    processMessage
};