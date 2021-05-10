const mongoose = require('mongoose');

const TokenSchema = mongoose.Schema({
    access_token:{
        type: String,
        required: true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'bank_users'
    }
})
module.exports = mongoose.model('tokens', TokenSchema)