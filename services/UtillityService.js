const chance = require('chance').Chance();
const cacheService = require('./cacheService');
const apiRequest = require('../helpers/APIRequest');


const generateUniqueValue = (length = 35, num = false, prefix = null) => {
    const pool = num ? '0123456789' : 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    const uniqueValue = chance.string({ length, pool });
    return prefix ? `${prefix}_${uniqueValue}` : uniqueValue;
}

module.exports = {
    generateOTP: () => {
        return chance.string({ length: 6, pool: '0123456789' });
    },

    formatCurrency: input => {
        return parseInt(input).toLocaleString('en-US', { style: 'decimal' });
    },

    postIntro: (post, no_of_letters = 500) => {
        if (post.length <= no_of_letters) return post;
        const intro = post.substr(0, no_of_letters - 1);
        return intro.substr(0, intro.lastIndexOf(' ')) + '...';
    },

    verifyOTP: (email, sentOTP) => {
        const otp = cacheService.get(email);
        return otp == sentOTP;
    },

    sendSMS: async (phone, message) => {
        const url = `https://api.ebulksms.com:8080/sendsms?username=visionvisaltd@gmail.com&apikey=${process.env.SMS_API_KEY}&sender=vExpress&messagetext=${message}&flash=0&recipients=${phone}`;

        const APIRequest = new apiRequest({});
        const res = await APIRequest.get(url);
    },

    generateUniqueValue,

    formatDate: date => new Date(date).toLocaleDateString('en-GB'),

    formatTime: date => new Date(date).toLocaleTimeString('en-US'),

    formatDateSince: function(date) {
        let seconds = Math.floor((new Date() - new Date(date)) / 1000);

        let interval = Math.floor(seconds / 31536000);

        if (interval > 1) {
            return interval + " years";
        }
        interval = Math.floor(seconds / 2592000);
        if (interval > 1) {
            return interval + " months";
        }
        interval = Math.floor(seconds / 86400);
        if (interval > 1) {
            return interval + " days";
        }
        interval = Math.floor(seconds / 3600);
        if (interval > 1) {
            return interval + " hours";
        }
        interval = Math.floor(seconds / 60);
        if (interval > 1) {
            return interval + " minutes";
        }
        return Math.floor(seconds) + " seconds";
    }
}