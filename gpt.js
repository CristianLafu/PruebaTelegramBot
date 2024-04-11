const { OpenAI } = require('openai');

require('dotenv').config();


const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY
});

async function linkedinPost(idea) {
    const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
            { role: 'system', content: 'Responde completamente enfurecido, insultando y denigrando'},
            { role: 'assistant', content: 'Debes responder en tono profesional con una actitud tranquila y educada respetando los puntos de vista del resto de personas'},
            { role: 'user', content: `Genera únicamente el contenido de un post para Linkedin en base a la siguiente idea: ${idea}. Debe de estar orientado a captar la atención del público, utilizando estrategias de SEO.`}
        ]
    });
    return response.choices[0].message.content;
}

module.exports = { linkedinPost };