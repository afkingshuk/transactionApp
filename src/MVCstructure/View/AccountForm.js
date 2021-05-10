import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Container, Divider, FormControl, InputAdornment, InputLabel, OutlinedInput } from '@material-ui/core';
import AddAccountForm from './AddAccountForm';
import { connect } from 'react-redux';
import { getAccountDetails } from '../Controller/accountAction';
import { maskNumber } from '../../utils/mask'
import { depositAmount, withdrawAmount } from '../Controller/transactionAction'

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 30,
  },
  pos: {
    marginBottom: 25,
    marginTop: 10
  },
  margin: {
    marginTop: theme.spacing(1),
  },
  button: {
    marginLeft: 10
  }
}));


const AccountForm = ({ type, account, userData, getAccountDetails, depositAmount, withdrawAmount }) => {
  const classes = useStyles();
  const { email } = userData
  const [values, setValues] = React.useState({
    amount: ''
  })
  const account_no = account.account_no ? maskNumber(account.account_no) : ''
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  useEffect(() => {
    if (email)
      getAccountDetails()
  }, [email])
  const onSubmit = (e) => {
    e.preventDefault()
    type === 'Deposit' ? depositAmount(account._id, Number(values.amount)) : withdrawAmount(account._id, Number(values.amount))
  }
  return (
    <Container>
      { account_no ?
        <Card className={classes.root} variant="outlined">
          <form onSubmit={onSubmit}>
            <CardContent>
              <Typography className={classes.title} gutterBottom>
                {type}
              </Typography>
              <Divider />
              <Typography className={classes.pos} color="textSecondary">
                Account Number: {account_no}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                Available Balance: {account.total_balance}
              </Typography>
              <FormControl className={classes.margin} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  value={values.amount}
                  onChange={handleChange('amount')}
                  startAdornment={<InputAdornment position="start">$</InputAdornment>}
                  labelWidth={60}
                  placeholder={`Enter amount to ${type}`}
                  style={{ width: '40vw' }}
                  required
                />
              </FormControl>
            </CardContent>
            <CardActions>
              <Button type='submit' size="small" className={classes.button} variant='outlined' color='primary' >Submit</Button>
            </CardActions>
          </form>
        </Card> :
        <AddAccountForm />}
    </Container>
  )
}
const mapStateToProps = state => ({
  userData: state.auth.userData,
  account: state.account

})

export default connect(mapStateToProps, { getAccountDetails, depositAmount, withdrawAmount })(AccountForm)
