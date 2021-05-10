const express = require('express');
const authMiddleware = require('../../middleware/auth');
const BankUser = require('../../Model/models/BankUser');
const { isInvalidField } = require('../../utils/common');
const Router = express.Router();

Router.post('/profile', authMiddleware, async (req, res) => {
  try {
    const { fname, lname, email } = req.body;

    const validFieldsToUpdate = ['fname', 'lname', 'email'];
    const receivedFields = Object.keys(req.body);

    const isInvalidFieldProvided = isInvalidField(
      receivedFields,
      validFieldsToUpdate
    );
    console.log(isInvalidFieldProvided)
    if (isInvalidFieldProvided || !fname || !lname || !email) {
      return res.status(400).send({
        update_error: 'Invalid field.'
      });
    }
    const result = await BankUser.findByIdAndUpdate(req.user._id, { fname, lname, email }, { new: true }).select('-password')
    console.log(result)
    // const result = await pool.query(
    //   'update bank_user set first_name=$1,last_name=$2 where userid=$3 returning userid,first_name,last_name,email',
    //   [firsname, last_name, req.user.userid]
    // );
    res.send(result);
  } catch (error) {
    res.status(400).send({
      update_error: 'Error while updating profile..Try again later.'
    });
  }
});

Router.get('/profile', authMiddleware, async (req, res) => {
  try {
    res.send(req.user);
  } catch (error) {
    res.status(400).send({
      update_error: 'Error while getting profile data..Try again later.'
    });
  }
});

module.exports = Router;