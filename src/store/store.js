import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import authReducer from '../MVCstructure/Model/authReducer'
import alertReducer from '../MVCstructure/Model/alertReducer'
import { profileReducer } from '../MVCstructure/Model/profileReducer'
import accountReducer from '../MVCstructure/Model/accountReducer'
import transactionReducer from '../MVCstructure/Model/transactionReducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
    combineReducers({
        auth: authReducer,
        alert: alertReducer,
        profile: profileReducer,
        account: accountReducer,
        transaction: transactionReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
)

export default store