const jwt = require('jsonwebtoken');
const BankUser = require('../Model/models/BankUser');
const Tokens = require('../Model/models/Tokens');


const authMiddleware = async function (req, res, next) {
    try {
        const token = req.header('Authorization').split(' ')[1];
        const decoded = jwt.verify(token, process.env.secret);
        const tokenResponse = await Tokens.findOne({ access_token: token, userId: decoded._id })
        if (tokenResponse) {
            const user = await BankUser.findById(tokenResponse.userId).select('-password')
            req.user = user;
            req.token = token;
            next();
        } else {
            throw new Error('Error while authentication');
        }
    } catch (error) {
        res.status(400).send({
            auth_error: 'Authentication failed.'
        });
    }
}

module.exports = authMiddleware;
