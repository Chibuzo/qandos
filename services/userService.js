const { User } = require('../models');
const emailService = require('../services/emailService');
const bcrypt = require('bcryptjs');
const { Buffer } = require('buffer');
const crypto = require('crypto');
const path = require('path');
const { generateOTP } = require('./UtillityService');
const { Op } = require('sequelize');
const saltRounds = 10;
const { ErrorHandler } = require('../helpers/errorHandler');


const create = async ({ fullname, email, phone, password, ...rest }) => {
    if (!fullname) throw new ErrorHandler(400, 'Full name is required');
    if (!phone) throw new ErrorHandler(400, 'Phone number is required');
    if (!email) throw new ErrorHandler(400, 'Email is required');
    if (!password) throw new ErrorHandler(400, 'Password is required');

    const existingEmail = await User.findOne({ where: { [Op.or]: [{ email }, { phone }] } });

    if (existingEmail) throw new ErrorHandler(400, `A user already exist with this email or phone`);

    const passwordHash = await bcrypt.hash(password, saltRounds);
    const data = {
        fullname,
        email,
        phone,
        password: passwordHash,
        ...rest
    };
    const newUser = await User.create(data);
    emailService.sendConfirmationEmail(newUser);
    delete newUser.password;
    return newUser;
}

const verifyCac = async ({ company, cac_no }) => {

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

    if (user.status === 'inactive') {
        return { user };
    }

    // send OTP
    const otp = sendOtp(user);
    console.log(user)
    delete user.password;
    return { user, otp };
}

const sendOtp = ({ fullname, email, phone }) => {
    const otp = generateOTP();
    // if (email) emailService.sendOTP(fullname, email, otp);
    // if (phone) smsService.sendOTP(fullname, phone, otp);
    return otp;
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
    await User.update({ status: 'active' }, { where: { email } });
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

    return User.update({ password: passwordHash }, { where: { id: user_id } });
}

const find = async (criteria = {}) => {
    const { where = {} } = criteria;
    delete criteria.where;
    where.deleted = false;
    const users = await User.findAll({
        where,
        order: [
            ['createdAt', 'DESC']
        ],
        ...criteria
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
    return {
        ...user.toJSON()
    };
}

module.exports = {
    create,
    login,
    activateAccount,
    find,
    view,
    updateUser,
    verifyPasswordResetLink,
    changePassword,
    uploadProfilePhoto,
    verifyCac
}