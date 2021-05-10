import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({component: Component,auth, ...rest}) => {
    const isAuthenticated = auth.isAuthenticated
    return (
            <Route {...rest} render={props => !isAuthenticated ? (
                <Redirect to='/'/>
            ):(
            <Component {...props} />
            )}/>
    )
}
const mapStateToProps = state => ({
    auth: state.auth
})


export default connect(mapStateToProps)(PrivateRoute)
