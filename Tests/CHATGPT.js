const fs = require('fs')
const OpenAI = require('openai')

// API OpenAI
const apiKey = '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';
const openai = new OpenAI({apiKey});

async function main(audio){
    const transciption = await openai.audio.transcriptions.create({
        file:fs.createReadStream(audio),
        model: "whisper-1",
        language: "pt-br",
    });
    return transciption
}

main("teste.ogg");