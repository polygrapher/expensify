import React from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import ExpenseForm from './ExpenseForm';
import {editExpense, startRemoveExpense, startEditExpense} from '../actions/expenses';
export class EditExpensePage extends React.Component {
    onSubmit = (updates) => {
        this.props.startEditExpense(this.props.expense.id, updates);
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
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Add expense</h1>
                    </div>
                </div>
                <div className="content-container">
                    <ExpenseForm expense={this.props.expense} onSubmit={this.onSubmit} />
                    <button className="button button--secondary" onClick={this.onRemoveButtonClick}>Remove Expense</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => ({
    expense: state.expenses.find((expense) => {
        return expense.id === props.match.params.id
    })
});

const mapDispatchToProps = (dispatch) => (bindActionCreators({editExpense, startRemoveExpense, startEditExpense}, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);