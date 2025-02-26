const { NewsLetter } = require('../models');
const { ErrorHandler } = require('../helpers/errorHandler');

const create = async ({ email }) => {
    if (!email) throw new ErrorHandler(400, 'Email is required');
    const existingEmail = await NewsLetter.findOne({ where: { email } });
    if (existingEmail) return existingEmail;

    const newEmail = await NewsLetter.create({ email });
    return newEmail;
}

const list = async () => {
    return NewsLetter.findAll();
}

const unSubscribe = async (email) => {
    if (!email) throw new ErrorHandler(400, 'Email is required');
    const existingEmail = await NewsLetter.findOne({ where: { email } });
    if (!existingEmail) throw new ErrorHandler(404, 'Email not found');
    await existingEmail.destroy();
    return existingEmail;
}

module.exports = {
    create,
    list,
    unSubscribe
}