import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from '../components/Header';

export const PrivateRoute = ({
    isAuthenticated,
    component: Component,
    ...rest // gather all of the remaining values under rest variable
}) => (
    <Route {...rest} component={(props) => (
        isAuthenticated ? (
            <Route {...rest} component={(props) => (
                <div>
                    <Header />
                    <Component {...props} />
                </div>
            )} />
        ) : (
            <Redirect to="/" />
        )
    )} />


);

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid
})

export default connect(mapStateToProps)(PrivateRoute)