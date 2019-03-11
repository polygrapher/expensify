import React from 'react';
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux';
import {startLogout} from '../actions/auth';
import {bindActionCreators} from 'redux';

export const Header = ({startLogout}) => (
    <header>
        <h1>Expensify</h1>
        <NavLink to="/dashboard" activeClassName="is-active">Dashboard</NavLink>
        <NavLink to="/create" activeClassName="is-active">New Expense</NavLink>
        <button onClick={startLogout}>Log out</button>
    </header>
);

const mapDispatchToProps = (dispatch) => bindActionCreators({startLogout}, dispatch);

export default connect(undefined, mapDispatchToProps)(Header);