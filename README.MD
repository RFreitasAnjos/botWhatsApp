# SAF (Sistema de Atendimento ao Fiscal)

## Descrição

O **SAF** é um script que busca encurtar as necessidades do Fiscal de Campo a outros setores da empresa de forma ágil e prática.  

## Recursos

- **Menu interativo**: Opções de menu para guiar o usuário em fluxos de conversa.
- **Instruturação com IA**: Organiza e-mail para estrutura formal para disparar e-mail para os setores direcionados.
- **Integração com APIs**: Conecta-se a sistemas externos para obter informações em tempo real.
- **Suporte a multimídia**: Envio e recebimento de imagens, áudio e documentos.
- **Registro de interações**: Armazena histórico de conversas para análise posterior.
- **Suporte a Webhooks**: Permite integração com sistemas de terceiros.

## Tecnologias Utilizadas

- **Node.js** para o backend.
- **Axios** para requisições HTTP.
- **Moment** para modificar formatos de hora.
- **IA** para tratar as informações recebidas (Áudios, Documentos, Imagens e Texto).
- **Mongo** para armazenamento de dados. (Implementar)
- **Emailjs** para envio de e-mails.
- **WhatsApp-web.js** para interação com o WhatsApp.
- **QR-CODE** para autenticar de forma prática.

## Instalação

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
4. Configure as variáveis de ambiente no arquivo `.env` para enviar e-amils:
   ```env
   EMAILJS_PRIVATE_KEY=SuaChavePrivada
   EMAILJS_PUBLIC_KEY=SuaChavePublica
   ```
5. Inicie o servidor:
   ```bash
   node index.js
   ```

## Uso

- Inicie uma conversa com o bot enviando apenas uma mensagem no WhatsApp, você irá receber um menu intuitívo da seguinte maneira:

   Olá {{Client}}, Para que possamos direcioná-lo da melhor forma possível, por favor, selecione a opção que melhor descreve o motivo do seu contato

    1 - Solicitar combustível (Esse meio só está disponível após o dia 20 de cada mês.)
 
    2 - Solicitar EPI's (Joelheiras, Cotoveleiras, Balaclava, Manguito, Bota, Capacete...) 
 
    3 - Moto (Solicitar Documento, Informar Quilometragem, Notificar Quebra)

    4 - Reportar problemas com o Smarthphone/Aplicativo

    5 - Reportar Incidente/Acidente
 
    6 - Atendimento ao Fiscal (Plano Odontológico/Plano de Saúde/Ajuste de Ponto)


Em breve, daremos início ao seu atendimento.


Atenciosamente,

TPF ENGENHARIA/CCO EMLURB

  - **1** - Será disparado imediatamente um e-mail para o nosso setor de compras, solicitando a inserção de créditos no cartão combustível.
  - **2** - Será enviado um link do nosso formulário para solicitação de EPI's.
  - **3** - Será redirecionado para um submenu, lá você poderá nos informar a quilometragem da moto, solicitar o documento atualizado da moto ou notificar quebra ou mau funcionamento do veículo.
  - **4** - Será direcionado para um suporte pre-moldado com alternativas para solucionar possíveis problemas com o Smartphone ou Aplicativos coorporativos.
  - **5** - Irá receber as informações do colaborador, pre-definidas no contato e o que foi digitado pelo mesmo, com o fim de organizar as informações recebidas através de uma IA e sem seguida disparar um e-mail para o SESMT, com o fim de notificar com agilidade os incidentes e acidentes acontecidos na empresa.
  - **6** - Será redirecinado para um submenu, onde será possível atender demandas referente a benefícios da empresa.

## Contribuição

1. Faça um fork do repositório.
2. Crie um branch para sua funcionalidade (`git checkout -b minha-feature`).
3. Commit suas alterações (`git commit -m 'Adiciona nova funcionalidade'`).
4. Envie seu branch (`git push origin minha-feature`).
5. Abra um Pull Request.

## Licença

Este projeto está licenciado sob a TPF Engenharia.
Desenvolvido por Gláucio Oliveira e Renan Freitas.

## Contato - Desenvolvedor
- **Email:** [renan.freitas.anjos@gmail.com](mailto\:renan.freitas.anjos@gmail.com)
- **GitHub:** [RFreitasAnjos](https://github.com/RFreitasAnjos)
