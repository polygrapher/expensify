import React from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import ExpenseForm from './ExpenseForm';
import {editExpense, startRemoveExpense} from '../actions/expenses';

export class EditExpensePage extends React.Component {
    onSubmit = (updates) => {
        this.props.editExpense(this.props.expense.id, updates);
        this.props.history.push('/');
    }

    onRemoveButtonClick = () => {
        this.props.startRemoveExpense({id: this.props.expense.id});
        // This may redirect before item was deleted in firebase
        this.props.history.push('/');

        // TODO figure out how to handle promise in jest.fn();
        // this.props.startRemoveExpense({id: this.props.expense.id}).then(() => {
        //     this.props.history.push('/');
        // }).catch((e) => {
        //     console.error('Failed to remove expense');
        // });
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

const mapDispatchToProps = (dispatch) => (bindActionCreators({editExpense, startRemoveExpense}, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);