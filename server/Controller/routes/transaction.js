const express = require('express');
const authMiddleware = require('../../middleware/auth');
const Account = require('../../Model/models/Account');
const Transactions = require('../../Model/models/Transactions');
const Router = express.Router();
const { startSession } = require('mongoose');
const { getTransactions } = require('../../utils/common');


Router.post('/deposit/:id', authMiddleware, async (req, res) => {
    const session = await startSession()
    try {
        session.startTransaction()
        const account_id = req.params.id
        const { deposit_amount } = req.body
        const result = await Account.findById(account_id)
        const { total_balance } = result
        const total = total_balance + deposit_amount

        const transactionObj = new Transactions({
            deposit_amount,
            balance: total,
            account_id
        })
        await transactionObj.save({ session })

        const accountDetails = await Account.findByIdAndUpdate(account_id, { total_balance: total }, { new: true, session })
        await session.commitTransaction()
        session.endSession()
        res.send({
            msg: 'Amount Deposited!!',
            transactionObj,
            accountDetails
        })
    } catch (error) {
        await session.abortTransaction()
        session.endSession()
        console.log(error)
        res.status(400).send({
            add_error: 'Error while depositing amount..Try again later.'
        });
    }
})

Router.post('/withdraw/:id', authMiddleware, async (req, res) => {
    const session = await startSession()
    try {
        session.startTransaction()
        const { withdraw_amount } = req.body
        const account_id = req.params.id
        const result = await Account.findById(account_id)
        const { total_balance } = result
        const total = total_balance - withdraw_amount
        if (withdraw_amount <= total_balance) {
            const transactionObj = new Transactions({
                withdraw_amount,
                balance: total,
                account_id
            })
            await transactionObj.save({ session })
            const accountDetails = await Account.findByIdAndUpdate(account_id, { total_balance: total }, { new: true, session })
            await session.commitTransaction()
            session.endSession()
            res.send({
                msg: 'Amount withdrawn',
                transactionObj,
                accountDetails
            })
        } else {
            return res.status(400).send({
                withdraw_error: "You don't have enough balance in your account"
            });
        }
    } catch (error) {
        await session.abortTransaction()
        session.endSession()
        console.log(error)
        res.status(400).send({
            withdraw_error: 'Error while withdrawing amount..Try again later.'
        });
    }
})

Router.get('/transactions/:id', authMiddleware, async (req, res) => {
    const { start_date, end_date } = req.query
    try {
        const result = await getTransactions(req.params.id, start_date, end_date)
        res.send(result)
    } catch (error) {
        res.status(400).send({
            transactions_error:
                'Error while getting transactions list..Try again later.'
        });
    }
})

module.exports = Router