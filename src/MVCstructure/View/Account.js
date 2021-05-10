import React from 'react'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import PaymentIcon from '@material-ui/icons/Payment'
import ListIcon from '@material-ui/icons/List';
import AccountForm from './AccountForm';
import Summary from './Summary';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-prevent-tabpanel-${index}`}
      aria-labelledby={`scrollable-prevent-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-prevent-tab-${index}`,
    'aria-controls': `scrollable-prevent-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));



const Account = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          scrollButtons="off"
          aria-label="scrollable prevent tabs example"
        >
          <Tab icon={<LocalAtmIcon />} label='WITHDRAW' aria-label="phone" {...a11yProps(0)} />
          <Tab icon={<PaymentIcon />} label='DEPOSIT' aria-label="favorite" {...a11yProps(1)} />
          <Tab icon={<ListIcon />} label='SUMMARY' aria-label="person" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <AccountForm type='Withdraw'/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AccountForm type='Deposit'/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Summary/>
      </TabPanel>
    </div>
    )
}

export default Account
