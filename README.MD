# WhatsApp Chatbot

## Descrição

O **WhatsApp Chatbot** é um software automatizado que permite a interação com os fiscais de campo via WhatsApp, respondendo mensagens como suporte técnico, executando comandos e integrando-se com sistemas externos.

## Recursos

- **Respostas automatizadas**: Responde mensagens com base em palavras-chave e contexto.
- **Integração com APIs**: Conecta-se a sistemas externos para enviar e obter informações em tempo real.
- **Menu interativo**: Opções de menu para guiar o usuário em fluxos de conversa.
- **Suporte a multimídia**: Envio e recebimento de áudios.
<!-- **Registro de interações**: Armazena histórico de conversas para análise posterior.-->
- **Suporte a Webhooks**: Permite integração com sistemas de terceiros.

## Tecnologias Utilizadas

- **Node.js** para o backend.
<-- Adicionar informações sobre a IA usada -->
<!-- - **DeepSeek** para --> 
<!-- - **MongoDB** para armazenamento de dados. -->
- **WhatsApp Business API** ou **Venom-Bot** para interação com o WhatsApp.

## Instalação 
1 - Step (IA)

1. Instalação do LMStudio:
   https://lmstudio.ai/

2. Configuração:
   Direcionar porta do servidor da IA.
   Escolher versão da IA.
   Integrar IA ao BackEnd. 

#---------------------------------------------------------#

2 - Step

1. Clone este repositório:
   ```bash
   git clone https://github.com/seu-usuario/whatsapp-chatbot.git
   ```
2. Acesse o diretório do projeto:
   ```bash
   cd whatsapp-chatbot
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Configure as variáveis de ambiente no arquivo `.env`:
   ```env
   WHATSAPP_API_KEY=seu_token
   DATABASE_URL=mongodb://localhost:27017/chatbot
   ```
5. Inicie o servidor:
   ```bash
   npm start
   ```

## Uso

- Inicie uma conversa com o bot enviando uma mensagem no WhatsApp.
- Utilize comandos predefinidos, como:
  - `1` - Para solicitar crédito para o cartão combustível.
  - `2` - Para solicitar link para preenchimento de solicitação de EPI.
  - `3` - Reportar incidentes/acidentes ocorridos com os fiscais.
  - `4` - Reportar problemas com SmartPhone.
  - `5` - Atendimento Especializado.

## Contribuição

1. Faça um fork do repositório.
2. Crie um branch para sua funcionalidade (`git checkout -b minha-feature`).
3. Commit suas alterações (`git commit -m 'Adiciona nova funcionalidade'`).
4. Envie seu branch (`git push origin minha-feature`).
5. Abra um Pull Request.

## Contato

- **Email:** [renan.freitas@tpfe.com.br](mailto\:contato@exemplo.com)
- **GitHub:** [RFreitasAnjos](https://github.com/RFreitasAnjos)
