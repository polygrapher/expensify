import React from 'react';
import { connect } from 'react-redux';

import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';

export const ExpenseList = ({expenses = []}) => (
    <div>
        <h1>Expense List</h1>
        {
            expenses.length ? (
                <ul>
                    {expenses.map((expense) => <ExpenseListItem {...expense} key={expense.id} />)}
                </ul>
            ) : (
                <p>No expenses found</p>
            )
        }
    </div>
);

const mapStateToProps = ({expenses, filters}) => ({
    expenses: selectExpenses(expenses, filters)
});

export default connect(mapStateToProps)(ExpenseList);