import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import ExpenseTotal from './ExpenseTotal';
import selectExpenses from '../selectors/expenses';

export const ExpenseList = ({expenses = []}) => (
    <div className="content-container">
        <div className="list-header">
            <div className="show-for-mobile">Expenses</div>
            <div className="show-for-desktop">Expense</div>
            <div className="show-for-desktop">Amount</div>
        </div>
        <div className="list-body">
            {
                expenses.length ? (
                    <ul className="list-body__items">
                        {expenses.map((expense) => <ExpenseListItem {...expense} key={expense.id} />)}
                    </ul>
                ) : (
                    <div className="list-item list-item--message">No expenses found</div>
                )
            }
        </div>
    </div>
);

const mapStateToProps = ({expenses, filters}) => ({
    expenses: selectExpenses(expenses, filters)
});

export default connect(mapStateToProps)(ExpenseList);