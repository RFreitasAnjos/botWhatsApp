class CreditManager {
    constructor(initialCredit) {
      this.initialCredit = initialCredit;
      this.currentCredit = initialCredit;
    }
  
    updateCredit(currentDate = new Date()) {
      const date = new Date(currentDate);
      const day = date.getDate();
      const dayOfWeek = date.getDay(); // 0 = Domingo, 6 = Sábado
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
  
      // Bloqueia o crédito do dia 1 ao dia 19 de cada mês
      if (day < 20 || isWeekend) {
        return "Crédito bloqueado até o dia 20.";
      }
  
      // Se a data estiver entre 20 e 24 e não for fim de semana, o valor permanece inalterado
      if (day >= 20 && day < 24 && !isWeekend) {
        return this.currentCredit;
      }
  
      // Se a data for entre 25 e 31, reduz R$5 por dia (desde o dia 25)
      if (day >= 25 && day <= 31) {
        const daysPassed = day - 25; // Dias decorridos desde o dia 25
        this.currentCredit = Math.max(0, this.initialCredit - daysPassed * 5);
      }
  
      return this.currentCredit;
    }
  }

class audio {
  constructor(audio){
    this.audio = audio;
  }
  /*
  const id = '5511972553036@c.us'; // IA for transcribe audio
  await client.sendMessage(id,media, {sendAudioAsVoice: true});
  await client.sendMessage(chatId,"Aguarde, o retorno")
  */
  
}
module.exports = {
    CreditManager,
    audio,
}