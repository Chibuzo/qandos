const cron = require('node-cron');
const newsletterService = require('../services/newsLetterService');

// run cron job every sunday at 12am
cron.schedule('0 0 * * 0', async () => {
    newsletterService.sendWeeklyNewsLetter();
});
