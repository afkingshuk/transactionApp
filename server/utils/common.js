const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const BankUser = require('../Model/models/BankUser');
const Transactions = require('../Model/models/Transactions');

const isInvalidField = (receivedFields, validFieldsToUpdate) => {
  console.log(receivedFields, validFieldsToUpdate)
  return validFieldsToUpdate.some(
    (field) => receivedFields.indexOf(field) === -1
  ) || receivedFields.some(
    (field) => validFieldsToUpdate.indexOf(field) === -1
  )
};


const validateUser = async (email, password) => {
  const result = await BankUser.findOne({ email })
  const user = result;
  if (user) {
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      delete user.password;
      return user;
    } else {
      throw new Error();
    }
  } else {
    throw new Error();
  }
};

const generateAuthToken = async (user) => {
  const { _id, email } = user;
  const secret = process.env.secret;
  const token = await jwt.sign({ _id, email }, secret);
  return token;
};


const getTransactions = async (account_id, start_date, end_date) => {
  try {
    if (start_date && end_date) {
      const result = await Transactions.find({
        account_id,
        transaction_date: {
          $gte: new Date(start_date),
          $lte: new Date(end_date)
        }
      }).sort({ transaction_date: 'desc' })
      return result
    }
    else {
      const result = await Transactions.find({
        account_id
      }).sort({ transaction_date: 'desc' })
      return result
    }
  } catch (error) {
    throw new Error();
  }
}

module.exports = {
  isInvalidField,
  validateUser,
  generateAuthToken,
  getTransactions
};



