import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';
import { bindActionCreators } from 'redux';

export const LoginPage = ({ startLogin }) => {
    return (
        <div className="page">
            <h1>Login page</h1>
            <button onClick={startLogin}>Login</button>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => (bindActionCreators({
    startLogin
}, dispatch));

export default connect(undefined, mapDispatchToProps)(LoginPage);