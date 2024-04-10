const express = require ('express');
const { Telegraf } = require('telegraf');
const axios = require('axios').default;


// Config .env
require('dotenv').config();

// Creamos aplicación de Express
const app = express();

//Creamos el bot de Telegram
const bot = new Telegraf(process.env.BOT_TOKEN);


// Config conexión telegram
app.use(bot.webhookCallback('/telegram-bot'));
bot.telegram.setWebhook(`${process.env.BOT_URL}/telegram-bot`)

app.post('/telegram-bot', (req, res) => {
    res.send('Responde');
});


// COMANDOS
bot.command('d6', ctx => {

    ctx.reply('Dale loko!!');
    ctx.replyWithDice();

});

bot.command('tiempo', async ctx => {
    // const ciudad = await ctx.message.text.split('/tiempo') [1];
    const ciudad = await ctx.message.text.slice(8);


    try {
        const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${process.env.OWM_API_KEY}&units=metric`)
    
        console.log(data);
            
        await ctx.replyWithHTML(`<b>Tiempo en ${ciudad.toLocaleUpperCase()}</b>
        Temperatura ${data.main.temp}ºC
        Mínima ${data.main.temp_min}ºC
        Máxima ${data.main.temp_max}ºC
        Humedad ${data.main.humidity}%`);
        await ctx.replyWithLocation(data.coord.lat, data.coord.lon);



    } catch (error) {
        ctx.reply(`No tenemos datos para la ciudad ${ciudad}`)
    }

});





















// Comienzan los desvarios 

bot.command('tequierotio', ctx => {
    ctx.reply('¡Y yo a vos, oh mi queridisimo creador que me has dado la vida!');
});

bot.command('Claudia', ctx => {
    ctx.reply('¡Oh!, ¿Te refieres a esa preciosa mujer que hace crecer las flores a su paso?');
});

bot.command('nosequehacer', ctx => {
    ctx.reply('Respira cariño, confio en ti, estás haciendo lo correcto');
});

bot.command('borja', ctx => {
    ctx.reply('¡Calvo!');
});

// Poner a escuchar en un puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`)
})