import React from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import ExpenseForm from './ExpenseForm';
import {editExpense, removeExpense} from '../actions/expenses';

export class EditExpensePage extends React.Component {
    onSubmit = (updates) => {
        this.props.editExpense(this.props.expense.id, updates);
        this.props.history.push('/');
    }

    onRemoveButtonClick = () => {
        this.props.removeExpense({id: this.props.expense.id});
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <ExpenseForm expense={this.props.expense} onSubmit={this.onSubmit} />
                <button onClick={this.onRemoveButtonClick}>Remove</button>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => ({
    expense: state.expenses.find((expense) => {
        return expense.id === props.match.params.id
    })
});

const mapDispatchToProps = (dispatch) => (bindActionCreators({editExpense, removeExpense}, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);