const formatFns = require('../services/UtillityService');
const { APP_NAME } = require('../config/constants');

module.exports = (req, res, next) => {
    res.locals.view = formatFns;
    res.locals.user = req.session.user;
    res.locals.baseUrl = process.env.BASE_URL;
    res.locals._app_name = APP_NAME;
    return next();
}