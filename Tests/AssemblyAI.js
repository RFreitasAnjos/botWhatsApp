import { AssemblyAI } from 'assemblyai';
import fs from 'fs';

const client = new AssemblyAI({ apiKey: '052e7d9afbbf4140a8a769eb4cbac39e' });

export async function transcribeAudio(filePath) {
  try {
    // Lê o arquivo de áudio como buffer
    const audioBuffer = fs.readFileSync(`${filePath}.mp3`);
    
    // Faz o upload do áudio para o AssemblyAI
    const uploadResponse = await client.files.upload(audioBuffer);
    const FILE_URL = uploadResponse.upload_url;

    console.log("URL pública do arquivo:", FILE_URL);

    // Configuração para a transcrição
    const ad = {
      audio_url: './audio/1738898407.mp3',
      language_detection: true,
      language_confidence_threshold: 0.4,
      speaker_labels: true,
    };

    // Realiza a transcrição
    const transcript = await client.transcripts.transcribe(ad);
    console.log("Texto transcrito:", transcript.text);

    return transcript.utterances?.map(utterance => utterance.text).join(' ') || transcript.text;

  } catch (error) {
    console.error("Erro ao transcrever o áudio:", error);
    throw error;
  }
}
