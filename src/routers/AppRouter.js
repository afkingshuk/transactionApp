import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch, BrowserRouter, Router } from 'react-router-dom'
import Login from '../MVCstructure/View/Login'
import Profile from '../MVCstructure/View/Profile'
import Register from '../MVCstructure/View/Register'
import { createBrowserHistory } from 'history'
import PrivateRoute from './PrivateRoute'
import Navbar from '../MVCstructure/View/Navbar'
import Account from '../MVCstructure/View/Account'

// export const history = createBrowserHistory()

const AppRouter = ({ auth }) => {
    return (
        <BrowserRouter>
            <div>
                {auth.isAuthenticated && <Navbar />}
                <Switch>
                    <Route path='/' component={Login} exact={true} />
                    <Route path='/register' component={Register} />
                    <PrivateRoute path='/profile' component={Profile} />
                    <PrivateRoute path='/account' component={Account} />

                </Switch>
            </div>
        </BrowserRouter>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, null)(AppRouter)
