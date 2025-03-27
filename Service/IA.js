const axios = require('axios');
// Objeto para armazenar o histórico de conversas
const conversationHistory = {};

// Função para processar mensagens usando LM Studio com histórico
async function processMessage(chatId, nome, placa, mensagem) {
    try {
        if(!iaAtiva){
            
        }

        // Inicializa o histórico do usuário, se não existir
        if (!conversationHistory[chatId]) {
            conversationHistory[chatId] = [];
        }

        // Adiciona a mensagem do usuário ao histórico
        conversationHistory[chatId].push({ role: "user", content: mensagem });

        // Limita o histórico para as últimas 10 interações
        if (conversationHistory[chatId].length > 10) {
            conversationHistory[chatId].shift();
        }

        // Verifica se todas as mensagens têm a estrutura correta
        conversationHistory[chatId] = conversationHistory[chatId].filter(msg => 
            typeof msg.content === "string" && msg.content.trim() !== ""
        );
        const url = "https://bit.ly/tpfe-forms-beneficios-saudeEodonto";
        // Criar a requisição com mensagens válidas
        const requestData = {
            model: "llama-3.2-1b-instruct",
            messages: [
                { role: "system", content: `Formule o texto recebido para modelar um e-mail corporativo sabendo que estará recebendo uma fiscal relatando um acidente de trabalho o nome dele é ${nome}.` },
                { role: "system", content: `Caso mencione a respeito do plano de saúde e/ou odontológico recomende esse site: ${url}`},
                ...conversationHistory[chatId]
            ],
            temperature: 0.7,
            max_tokens: 500
        };

        console.log("📤 Enviando requisição para LM Studio:", JSON.stringify(requestData, null, 2));

        const response = await axios.post('http://localhost:1234/v1/chat/completions', requestData);
        
        // Verifica se a resposta tem escolhas válidas
        if (!response.data.choices || response.data.choices.length === 0) {
            throw new Error("A resposta da API não contém choices.");
        }

        let reply = response.data.choices[0].message?.content || "Não houve resposta da IA.";

        // Remove qualquer <think>...</think> antes de responder
        reply = reply.replace(/<think>[\s\S]*?<\/think>/g, '').trim();

        // Adiciona a resposta da IA ao histórico
        conversationHistory[chatId].push({ role: "assistant", content: reply });

        console.log(`✅ Resposta gerada para ${chatId}: ${reply}`);
        return reply;

    } catch (error) {
        console.error('❌ Erro ao processar mensagem:', error.response?.data || error.message);
        return 'Desculpe, não consegui processar sua mensagem.';
    }
    finally{
        iaAtiva = false;
    }
}

module.exports = {
    processMessage,
};
