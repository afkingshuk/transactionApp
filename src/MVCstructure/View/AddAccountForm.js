import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Container, Divider, FormControl, InputAdornment, InputLabel, OutlinedInput } from '@material-ui/core';
import { connect } from 'react-redux';
import { addAccountDetails } from '../Controller/accountAction';

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


const AddAccountForm = ({ addAccountDetails }) => {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        accno: '',
        bankName: '',
        ifsc: ''
    })
    const onAdd = async (e) => {
        e.preventDefault()
        await addAccountDetails(values.accno, values.bankName, values.ifsc)
    }
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    return (
        <Container>
            <form onSubmit={onAdd}>
                <Card className={classes.root} variant="outlined">
                    <CardContent>
                        <Typography className={classes.title} gutterBottom>
                            Add Account
                    </Typography>
                        <Divider />
                        <FormControl className={classes.margin} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-amount">Account No</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-amount"
                                value={values.accno}
                                onChange={handleChange('accno')}
                                labelWidth={100}
                                style={{ width: '40vw' }}
                            />
                        </FormControl>
                        <FormControl className={classes.margin} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-amount">Bank Name</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-amount"
                                value={values.bankName}
                                onChange={handleChange('bankName')}
                                labelWidth={90}
                                style={{ width: '40vw' }}
                            />
                        </FormControl>
                        <FormControl className={classes.margin} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-amount">IFSC Code</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-amount"
                                value={values.ifsc}
                                onChange={handleChange('ifsc')}
                                labelWidth={90}
                                style={{ width: '40vw' }}
                            />
                        </FormControl>
                    </CardContent>
                    <CardActions>
                        <Button type='submit' size="small" className={classes.button} variant='outlined' color='primary' >Submit</Button>
                    </CardActions>
                </Card>
            </form>
        </Container>
    )
}

export default connect(null, { addAccountDetails })(AddAccountForm)
