import { Box, Button, FilledInput, FormControl, FormHelperText, Grid, IconButton, Input, InputAdornment, InputLabel, makeStyles, Snackbar, Typography } from '@material-ui/core'
import React, { useEffect } from 'react'
import clsx from 'clsx';
import { Email, Visibility, VisibilityOff } from '@material-ui/icons';
import { initiateLogin } from '../Controller/Auth'
import { connect } from 'react-redux';
import { validateFields } from '../../utils/Common';
import { Alert } from '@material-ui/lab';
import { setErrors } from '../Controller/Alert';
import { history } from '../../routers/AppRouter'
import { Link, useHistory } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(3),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '50ch',
  },
}));
const Login = ({ initiateLogin, error, setErrors, auth }) => {
  const classes = useStyles();
  let history = useHistory()
  const [values, setValues] = React.useState({
    password: '',
    showPassword: false,
    email: '',
    open: false
  });
  const handleLogin = (event) => {
    event.preventDefault();
    const { email, password } = values;
    const fieldsToValidate = [{ email }, { password }];

    const allFieldsEntered = validateFields(fieldsToValidate);
    if (!allFieldsEntered) {
      setErrors({ signin_error: 'Please enter all the fields!!' })
    } else {
      // login successful
      initiateLogin(email, password)
      // history.push('/profile')
    }
  };
  useEffect(() => {
    if (auth.isAuthenticated) {
      history.push('/profile')
    }
    if (error && error.length !== 0) {
      setValues({ ...values, open: true })
    }
    else {
      setValues({ ...values, open: false })
    }
  }, [error, auth.isAuthenticated, history])
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setValues({ ...values, open: false })

  };

  return (
    <>
      <form onSubmit={handleLogin}>
        {error && values.open && error.map(e => (<Snackbar open={values.open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            {e.errors.signin_error}
          </Alert>
        </Snackbar>))}
        <Grid>
          <Box justifyContent='center' display='flex' className={clsx(classes.margin)}>
            <Typography variant="h5" >Sign In to your account</Typography>
          </Box>
          <Box justifyContent='center' display='flex'>
            <FormControl className={clsx(classes.margin, classes.textField)} variant="filled">
              <InputLabel htmlFor="filled-adornment-password">Email</InputLabel>
              <FilledInput
                id="filled-adornment-password"
                type='email'
                value={values.email}
                onChange={handleChange('email')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="email icon"
                      edge="end"
                    >
                      <Email />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Box>
          <Box justifyContent='center' display='flex'>
            <FormControl className={clsx(classes.margin, classes.textField)} variant="filled">
              <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
              <FilledInput
                id="filled-adornment-password"
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Box>
          <Box justifyContent='center' display='flex'>
            <Button type='submit' variant="contained" className={clsx(classes.margin, classes.textField)} color="primary">SIGN IN</Button>
          </Box>
          <Box display='flex' justifyContent='center'>
            New Customer ? <Link to='/register' >
              <strong> Register</strong></Link>
          </Box>
        </Grid>
      </form>

    </>

  )
}

const mapStateToProps = (state) => ({
  error: state.alert.error,
  auth: state.auth
})

export default connect(mapStateToProps, { initiateLogin, setErrors })(Login)
