import { Box, Button, FilledInput, FormControl, FormHelperText, Grid, IconButton, Input, InputAdornment, InputLabel, makeStyles, Snackbar, Typography } from '@material-ui/core'
import React, { useEffect } from 'react'
import clsx from 'clsx';
import { Email, Visibility, VisibilityOff } from '@material-ui/icons';
import { connect } from 'react-redux';
import { register } from '../Controller/Auth'
import { validateFields } from '../../utils/Common'
import { setErrors } from '../Controller/Alert'
import { Alert } from '@material-ui/lab';
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
const Register = ({ register, error, setErrors, success }) => {
  const classes = useStyles();
  const history = useHistory()
  const [values, setValues] = React.useState({
    password: '',
    showPassword: false,
    email: '',
    fname: '',
    lname: '',
    isSubmitted: false,
    open: false,
  });
  const registerUser = async (event) => {
    event.preventDefault();
    const { fname, lname, email, password } = values;

    const fieldsToValidate = [
      { fname },
      { lname },
      { email },
      { password }
    ];

    const allFieldsEntered = validateFields(fieldsToValidate);
    if (!allFieldsEntered) {
      // setValues({...values, errorMsg: {signup_error: 'Please enter all the fields!!'}})
      setErrors({ signup_error: 'Please enter all the fields!!' })
    } else {
      const succ = await register({ fname, lname, email, password })
      if (succ) {
        history.push('/')
      }
      // if(succ.success){
      //     console.log('success..')
      //     setValues({...values, isSubmitted:true})

      //     setValues({...values, successMsg:'User registered successfully!!'})
      // }
    }
  };
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
    setValues({ ...values, isSubmitted: false })
  };

  useEffect(() => {
    if (error && error.length !== 0) {
      setValues({ ...values, open: true })
    }
    else if (success && success.length !== 0) {
      setValues({ ...values, isSubmitted: true })
    }
    else {
      setValues({ ...values, open: false })
      setValues({ ...values, isSubmitted: false })
    }
  }, [error, success])

  return (
    <form onSubmit={registerUser}>
      {error && values.open && error.map(e => (<Snackbar open={values.open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {e.errors.signup_error}
        </Alert>
      </Snackbar>))}
      { success && values.isSubmitted && success.map(s => <Snackbar open={values.isSubmitted} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          {s.successMsg}
        </Alert>
      </Snackbar>)}
      <Grid>
        <Box justifyContent='center' display='flex' className={clsx(classes.margin)}>
          <Typography variant="h5" >Sign Up</Typography>
        </Box>
        <Box justifyContent='center' display='flex'>
          <FormControl className={clsx(classes.margin, classes.textField)} variant="filled">
            <InputLabel htmlFor="filled-adornment-password">First Name</InputLabel>
            <FilledInput
              id="filled-adornment-password"
              type='text'
              value={values.fname}
              onChange={handleChange('fname')}
            />
          </FormControl>
        </Box>
        <Box justifyContent='center' display='flex'>
          <FormControl className={clsx(classes.margin, classes.textField)} variant="filled">
            <InputLabel htmlFor="filled-adornment-password">Last Name</InputLabel>
            <FilledInput
              id="filled-adornment-password"
              type='text'
              value={values.lname}
              onChange={handleChange('lname')}
            />
          </FormControl>
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
          <Button type='submit' variant="contained" className={clsx(classes.margin, classes.textField)} color="primary">SIGN UP</Button>
        </Box>
        <Box display='flex' justifyContent='center'>
          Already Registered ? <Link to='/' >
            <strong> Login</strong></Link>
        </Box>
      </Grid>
    </form>
  )
}
const mapStateToProps = (state) => ({
  error: state.alert.error,
  success: state.alert.success
})

export default connect(mapStateToProps, { register, setErrors })(Register)
