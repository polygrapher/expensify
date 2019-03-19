import React from 'react';
import {connect} from 'react-redux';
import numeral from 'numeral';
import {Link} from 'react-router-dom';
import selectExpenses from '../selectors/expenses';
import expensesTotal from '../selectors/expensesTotal';

export const ExpenseTotal = ({expensesCount, expensesTotalAmount}) => {
    const plural = 'expense' + (expensesCount > 1 ? 's' : '');
    const formattedTotal = numeral(expensesTotalAmount / 100).format('0,0.00');
    return (
        <div className="page-header">
            <div className="content-container">
                <h1 className="page-header__title">Viewing <span>{expensesCount}</span> {plural} totalling <span>${formattedTotal}</span></h1>
                <div className="page-header__actions">
                    <Link to="/create" className="button">Add expense</Link>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = ({expenses, filters}) => {
    const selectedExpenses = selectExpenses(expenses, filters);
    return {
        expensesCount: selectedExpenses.length,
        expensesTotalAmount: expensesTotal(selectedExpenses)
    }
};

export default connect(mapStateToProps)(ExpenseTotal);