import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { startAddExpense } from '../actions/expenses';
import ExpenseForm from './ExpenseForm';

export class AddExpensePage extends React.Component {
    onSubmit = (expense) => {
        this.props.startAddExpense(expense);
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <h1>Add expense</h1>
                <ExpenseForm
                    onSubmit={this.onSubmit}
                />
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({startAddExpense}, dispatch);

export default connect(undefined, mapDispatchToProps)(AddExpensePage);