const express = require('express');
const bcrypt = require('bcryptjs');
const {
  validateUser,
  isInvalidField,
  generateAuthToken
} = require('../../utils/common');
const authMiddleware = require('../../middleware/auth');
const BankUser = require('../../Model/models/BankUser');
const Tokens = require('../../Model/models/Tokens');

const Router = express.Router();

Router.post('/signup', async (req, res) => {
  try {
    const { fname, lname, email, password } = req.body;
    const validFieldsToUpdate = [
      'fname',
      'lname',
      'email',
      'password'
    ];
    const receivedFields = Object.keys(req.body);

    const isInvalidFieldProvided = isInvalidField(
      receivedFields,
      validFieldsToUpdate
    );

    if (isInvalidFieldProvided) {
      return res.status(400).send({
        signup_error: 'Invalid field.'
      });
    }

    // const result = await pool.query(
    //   'select count(*) as count from bank_user where email=$1',
    //   [email]
    // );
    const count = await BankUser.count({ email })
    // const count = result.rows[0].count;
    if (count > 0) {
      return res.status(400).send({
        signup_error: 'User with this email address already exists.'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 8);
    // await pool.query(
    //   'insert into bank_user(first_name, last_name, email, password) values($1,$2,$3,$4)',
    //   [fname, lname, email, hashedPassword]
    // );
    const user = new BankUser({
      fname,
      lname,
      email,
      password: hashedPassword
    })
    await user.save()
    res.status(201).send();
  } catch (error) {
    res.status(400).send({
      signup_error: 'Error while signing up..Try again later.'
    });
  }
});

Router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await validateUser(email, password);
    if (!user) {
      res.status(400).send({
        sigin_error: 'Email/password does not match.'
      });
    }
    console.log(user)
    const token = await generateAuthToken(user);
    //   const result = await pool.query(
    //     'insert into tokens(access_token, userid) values($1,$2) returning *',
    //     [token, user.userid]
    //   );
    const result = new Tokens({
      access_token: token,
      userId: user._id
    })
    await result.save()
    const resp = {
      email,
      token,
      _id: user._id
    }
    //   user.token = result.access_token;
    res.send(resp);
  } catch (error) {
    res.status(400).send({
      signin_error: 'Email/password does not match.'
    });
  }
});


Router.post('/logout', authMiddleware, async (req, res) => {
  try {
    const { _id } = req.user;
    //   await pool.query('delete from tokens where userid=$1 and access_token=$2', [
    //     userid,
    //     access_token
    //   ]);
    await Tokens.findOneAndRemove({ userId: _id, access_token: req.token })
    console.log('reqqqqqqqqqqq', req.token)
    res.send();
  } catch (error) {
    res.status(400).send({
      logout_error: 'Error while logging out..Try again later.'
    });
  }
});

module.exports = Router;