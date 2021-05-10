import { Box, Button, Card, CardActions, CardContent, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FilledInput, FormControl, IconButton, InputAdornment, InputLabel, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import EditIcon from '@material-ui/icons/Edit';
import clsx from 'clsx';
import { Email } from '@material-ui/icons';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateProfile } from '../Controller/profileActions';

const useStyles = makeStyles((theme) => ({
    root: {
        //   minWidth: 10,
        width: '100%'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 16,
    },
    paper: {
        margin: 'auto',
        maxWidth: 500
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
const Profile = ({ profileData, updateProfile }) => {
    const [values, setValues] = useState(
        {
            fname: null,
            lname: null,
            email: null
        }
    )
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });

    };
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setValues({ ...values, fname: profileData && profileData.fname, lname: profileData && profileData.lname, email: profileData && profileData.email })
    };
    const onSave = (e) => {
        e.preventDefault()
        updateProfile(values)
        setOpen(false)
        // handleClose()
    }
    useEffect(() => {
        setValues({ ...values, fname: profileData && profileData.fname, lname: profileData && profileData.lname, email: profileData && profileData.email })
    }, [profileData])
    return (
        <div>
            <Container className={classes.paper}>

                <Box display='flex' m={1} p={1} justifyContent="center">
                    <Typography variant="h4" component="h2">
                        Profile
                </Typography>
                </Box>
                <Card className={classes.root}>
                    {profileData && <CardContent>
                        <Box display="flex" justifyContent='flex-end'>
                            <IconButton color='primary' onClick={handleClickOpen}>
                                <EditIcon />
                            </IconButton>
                        </Box>
                        <Typography className={classes.pos} >
                            First Name : {profileData.fname}
                        </Typography>
                        <Typography className={classes.pos} >
                            Last Name : {profileData.lname}
                        </Typography>
                        <Typography className={classes.pos}>
                            Email : {profileData.email}
                        </Typography>
                    </CardContent>}
                    <Divider />
                    <CardActions>
                        <Button variant="outlined" color="primary" size="small">Change Password</Button>
                    </CardActions>
                </Card>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <form onSubmit={onSave}>
                        <DialogTitle id="alert-dialog-title">{"Edit Your Profile"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                <Box justifyContent='center' display='flex'>
                                    <FormControl className={clsx(classes.margin, classes.textField)} variant="filled">
                                        <InputLabel htmlFor="filled-adornment-password">First Name</InputLabel>
                                        <FilledInput
                                            id="filled-adornment-password"
                                            type='text'
                                            value={values.fname}
                                            onChange={handleChange('fname')}
                                            required
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
                                            required
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
                                            required
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
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Cancel
                    </Button>
                            <Button type='submit' color="primary" autoFocus>
                                Save
                    </Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </Container>
        </div>
    )
}

const mapStateToProps = state => ({
    profileData: state.profile.profileData
})

export default withRouter(connect(mapStateToProps, { updateProfile })(Profile))
