const { User } = require('../models');
const emailService = require('../services/emailService');
const bcrypt = require('bcryptjs');
const { Buffer } = require('buffer');
const crypto = require('crypto');
const path = require('path');
const { Op } = require('sequelize');
const saltRounds = 10;
const { ErrorHandler } = require('../helpers/errorHandler');
const { generateUniqueValue } = require('./UtillityService');

const create = async ({ fullname, email, phone, location, password, role = 'user' }) => {
    if (!fullname) throw new ErrorHandler(400, 'Full name is required');
    // if (!phone) throw new ErrorHandler(400, 'Phone number is required');
    if (!email) throw new ErrorHandler(400, 'Email is required');
    if (role == 'admin') throw new ErrorHandler(400, 'Invalid value');

    const existingUser = await User.findOne({ where: { [Op.or]: [{ email }] } });

    if (existingUser) 
        return existingUser

    const data = {
        fullname,
        email,
        phone,
        location,
        role
    };
    let emailPath = 'password-reset';
    if (password) {
        data.password = await bcrypt.hash(password, saltRounds);
        emailPath = 'activate';
    }
    if (role == 'partner') {
        data.agent_status = 'pending';
    }
    const newUser = await User.create(data);
    emailService.sendConfirmationEmail(newUser, emailPath);
    delete newUser.password;
    return newUser;
}

const login = async ({ email, password }) => {
    const user = await User.findOne({
        where: { email },
        // attributes: ['id', 'firstname', 'lastname', 'email', 'phone', 'password', 'status'],
        raw: true
    });
    if (!user) throw new ErrorHandler(404, 'Email or password is incorrect');

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new ErrorHandler(400, 'Email and password doesn\'t match');

    if (user.role == 'partner' && user.agent_status != 'verified') {
        throw new ErrorHandler(403,'Your account is yet to be verified. Please check back in 24 hours, or contact us from the <a href=\'/contact\'>contact page</a>');
    }

    if (user.status != 'active') {
        return { user };
    }
    return { user };
}

const findOne = async criteria => {
    return User.findOne({ where: criteria });
}

const view = async criteria => {
    const user = await findOne(criteria);
    if (!user) throw new ErrorHandler(404, 'User not found');
    return sanitize(user);
}

const activateAccount = async (email_hash, hash_string) => {
    if (!email_hash || !hash_string) {
        throw new ErrorHandler(400, 'Email or hash not found');
    }
    const email = Buffer.from(email_hash, 'base64').toString('ascii');
    const user = await view({ email });

    const hash = crypto.createHash('md5').update(user.email + 'okirikwenEE129Okpkenakai').digest('hex');
    if (hash_string !== hash) {
        throw new ErrorHandler(400, 'Invalid hash. couldn\'t verify your email');
    }
    let userData = { status: 'active' };
    if (user.role == 'partner') {
        userData.agentCode = generateUniqueValue(15, false);
    }
    await User.update(userData, { where: { email } });
    return { ...user, status: 'active' };
}

const verifyPasswordResetLink = async (email_hash, hash_string) => {
    if (!email_hash || !hash_string) {
        throw new ErrorHandler(400, 'Email or hash not found');
    }
    const email = Buffer.from(email_hash, 'base64').toString('ascii');
    const user = await User.findOne({ where: { email } }, { raw: true });
    if (!user) throw new ErrorHandler(400, 'User not found');

    const hash = crypto.createHash('md5').update(user.email + 'okirikwenEE129Okpkenakai').digest('hex');
    if (hash_string !== hash) {
        throw new ErrorHandler(400, 'Invalid hash. couldn\'t verify your email');
    }
    return { id: user.id, status: true };
}

const changePassword = async (newPassword, user_id) => {
    if (!newPassword) throw new ErrorHandler(400, 'Password can not be empty');
    const passwordHash = await bcrypt.hash(newPassword, saltRounds);

    return User.update({ password: passwordHash, status: 'active' }, { where: { id: user_id } });
}

const list = async (criteria = {}) => {
    const users = await User.findAll({
        where: { ...criteria, deleted: false },
        order: [
            ['createdAt', 'DESC']
        ],
        raw: true
    });
    return users.map(user => sanitize(user));
}

const updateUser = async (userData, id) => {
    return User.update({ ...userData }, { where: { id } });
}


const uploadProfilePhoto = async (photoFile, userId) => {
    const allowedFileTypes = ['image/gif', 'image/png', 'image/jpeg'];
    if (!allowedFileTypes.includes(photoFile.mimetype)) {
        throw new ErrorHandler(400, 'Unsupported file type');
    }
    const key = `profile-photo/${crypto.randomUUID()}${path.extname(photoFile.name)}`;
    const { Location } = await s3Upload(S3_BUCKET, key, photoFile.data);
    return User.update({ profilePhoto: Location }, { where: { id: userId } });
}


const sanitize = user => {
    delete user.password;
    return user;
}

module.exports = {
    create,
    login,
    activateAccount,
    list,
    view,
    updateUser,
    verifyPasswordResetLink,
    changePassword,
    uploadProfilePhoto,
}