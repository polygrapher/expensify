import React from 'react';
import {connect} from 'react-redux';
import numeral from 'numeral';
import selectExpenses from '../selectors/expenses';
import expensesTotal from '../selectors/expensesTotal';

export const ExpenseTotal = ({expensesCount, expensesTotalAmount}) => {
    const plural = 'expense' + (expensesCount > 1 ? 's' : '');
    const formattedTotal = numeral(expensesTotalAmount / 100).format('0,0.00');
    return (
        <div>
            <p>Viewing {expensesCount} {plural} totalling ${formattedTotal}</p>
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