'use strict';

const { Buffer } = require('buffer');
const path = require('path');
const nodemailer = require('nodemailer');
var hbs = require('nodemailer-express-handlebars');
const crypto = require('crypto');
const { APP_NAME } = require('../config/constants');

const options = {
    viewEngine: {
        extName: '.hbs',
        layoutsDir: path.join(__dirname, '../views/emails/'),
    },
    viewPath: path.join(__dirname, '../views/emails/')
};

let transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true, // true for 465, false for other ports,
    pool: true,
    rateLimit: 20,
    auth: {
        user: process.env.AWS_SES_USER,
        pass: process.env.AWS_SES_PASS
    }
});
transporter.use('compile', hbs(options));

const BASE_URL = process.env.BASE_URL;
const SENT_FROM = process.env.AWS_SES_USER;

const sendMail = (to, subject, template, data) => {
    data.appName = APP_NAME;
    data.baseUrl = BASE_URL;
    if (!data.hasGreetings)
        data.showGreetings = true;

    let mailOptions = {
        from: APP_NAME + ' <' + SENT_FROM + '>',
        to: to,
        subject: subject,
        template: template,
        context: data
    };
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        // console.log('Message sent: %s', info.messageId);
    });
}

module.exports = {
    sendConfirmationEmail: function (user, path) {
        if (user.fullname.length > 60) return;
        const email_b64 = Buffer.from(user.email).toString('base64');
        const hash = crypto.createHash('md5').update(user.email + 'okirikwenEE129Okpkenakai').digest('hex');

        const data = {
            user: user.fullname.split(' ')[0],
            url: BASE_URL + path + '/' + email_b64 + '/' + hash,
            base_url: BASE_URL
        };
        const subject = "Verify your email address";
        const template = 'verifyAccount';
        sendMail(user.email, subject, template, data);
    },

    sendPasswordResetLink: function (user) {
        if (!user) return false;
        const email_b64 = Buffer.from(user.email).toString('base64');
        const hash = crypto.createHash('md5').update(user.email + 'okirikwenEE129Okpkenakai').digest('hex');

        const data = {
            user: user.fullname,
            url: BASE_URL + 'password-reset/' + email_b64 + '/' + hash,
            base_url: BASE_URL
        };
        const subject = `${APP_NAME} Password Reset Link`;
        const template = 'passwordReset';
        sendMail(user.email, subject, template, data);
    },

    sendNewsletterWelcome: function (user) {
        const data = {
            user: user.fullname || 'Investor',
            hasGreetings: true
        }
        const subject = 'Welcome to QANDOS Real Estate Insider - Your Gateway to Smart Investments!';
        const template = 'newsletterWelcome';
        sendMail(user.email, subject, template, data);
    },

    sendWeeklyNewsLetter: function (subscribers, properties) {
        const data = {
            properties,
            base_url: BASE_URL
        };
        const subject = 'New Properties Recently Added';
        const template = 'weeklyNewsletter';
        subscribers.forEach(subscriber => {
            data.unsubscribeLink = BASE_URL + 'unsubscribe/' + Buffer.from(subscriber.email).toString('base64');
            sendMail(subscriber.email, subject, template, data);
        });
    },

    sendPaymentConfirmationEmail: function (user, investment) {
        const data = {
            user: user.fullname,
            investment_name: investment.Investment.InvestmentCategory.category_name,
            units: investment.units,
            currency: investment.currency.symbol,
            amount: formatCurrency(investment.amount_invested),
            url: BASE_URL + 'users/dashboard'
        };
        const subject = `Congratulations! You just invested in our ${data.investment_name}`;
        const template = 'paymentConfirmation';
        sendMail(user.email, subject, template, data);
    },

    emailIVExpress: function ({ sender_email, sender_name, sender_phone = '', subject = 'From FAQ', message }) {
        const template = 'IfemadEmail';
        const data = {
            sender_name,
            sender_email,
            sender_phone,
            message,
            base_url: BASE_URL
        };

        const mailOptions = {
            from: sender_name + '<' + SENT_FROM + '>',
            to: 'info@investnfarm.com',
            replyTo: sender_email,
            subject: subject,
            template: template,
            context: data
        };
        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            //console.log('Message sent: %s', info.messageId);
        });
    }
}