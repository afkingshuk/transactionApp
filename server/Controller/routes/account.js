const express = require('express')
const authMiddleware = require('../../middleware/auth')
const Account = require('../../Model/models/Account')
const BankUser = require('../../Model/models/BankUser')
const Router = express.Router()

//get account details by email
Router.get('/account', authMiddleware, async (req, res) => {
    try {
        //const userInfo = await BankUser.findOne({email: req.user.email}).select('-password')
        const accountInfo = await Account.findOne({ userId: req.user._id })
        console.log('user', req.user, accountInfo)
        if (accountInfo) {
            res.send({ account: accountInfo })
        }
        else {
            res.status(400).send({
                get_error: 'Account details does not exist.'
            });
        }

    } catch (error) {
        res.status(400).send({
            get_error: 'Error while getting account details..Try again later.'
        });
    }
})
//to add an account
Router.post('/account', authMiddleware, async (req, res) => {
    const { account_no, bank_name, ifsc } = req.body;
    try {
        const addAcc = new Account({
            account_no,
            bank_name,
            ifsc,
            userId: req.user._id
        })
        await addAcc.save()
        res.status(201).send({ account: addAcc });
    } catch (error) {
        res.send({
            add_error: 'Error while adding new account..Try again later.'
        });
    }
})

Router.patch('/account', authMiddleware, async (req, res) => {
    const { ifsc } = req.body
    try {
        const accountInfo = await Account.findOneAndUpdate({ userId: req.user._id }, { ifsc }, { new: true })
        res.send({ account: accountInfo })
    } catch (error) {
        res.send({
            update_error: 'Error while updating account..Try again later.'
        });
    }
})
module.exports = Router