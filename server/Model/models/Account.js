const mongoose = require('mongoose');

const AccountSchema = mongoose.Schema({
    account_no:{
        type: Number,
        required: true
    },
    bank_name:{
        type: String,
        required: true
    },
    ifsc:{
        type: String,
        required: true
    },
    total_balance:{
        type: Number,
        required: true,
        default: 0
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'bank_users'
    }
})
module.exports = mongoose.model('account', AccountSchema)