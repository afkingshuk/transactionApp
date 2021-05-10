const mongoose = require('mongoose');

const TransactionSchema = mongoose.Schema({
    transaction_date:{
        type: Date,
        default: Date.now,
        required: true
    },
    withdraw_amount:{
        type: Number
    },
    deposit_amount:{
        type: Number
    },
    balance:{
        type: Number,
        required: true,
        default: 0
    },
    account_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'account'
    }
})
module.exports = mongoose.model('transactions', TransactionSchema)