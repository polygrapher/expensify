import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';

export default class ExpenseForm extends React.Component {
    constructor(props) {
        super(props);
        const expense = props.expense || {};
        const {description = '', note = '', amount, createdAt} = expense;

        this.state = {
            error: '',
            description,
            note,
            amount: amount ? (amount / 100).toString() : '',
            createdAt: createdAt ? moment(createdAt) : moment(),
            calendarFocused: false
        }
    }

    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState(() => ({description}));
    }

    onNoteChange = (e) => {
        const note = e.target.value;
        this.setState(() => ({note}))
    }

    onDateChange = (createdAt) => {
        if (createdAt) {
            this.setState(() => ({createdAt}));
        }
    }

    onFocusChange = ({focused}) => {
        this.setState(() => ({calendarFocused: focused}))
    }

    onAmountChange = (e) => {
        const amount = e.target.value;
        if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState(() => ({amount}));
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        const {amount, description, createdAt, note} = this.state;

        const error = !amount || !description ? 'Please provide amount and description' : '';
        if (!error) {
            this.props.onSubmit({
                description,
                amount: parseFloat(amount, 10) * 100,
                createdAt: createdAt.valueOf(),
                note
            })
        } else {
            this.setState(() => ({error}));
        }
    }

    render() {
        const {error, description, note, createdAt, amount} = this.state;
        return (
            <form className="form" onSubmit={this.onSubmit}>
                {error && <p className="form__error">Error: {error}</p>}
                <input
                    className="text-input"
                    type="text"
                    placeholder="Description"
                    autoFocus
                    onChange={this.onDescriptionChange}
                    value={this.state.description}
                />
                <input
                className="text-input"
                    type="text"
                    placeholder="Amount"
                    onChange={this.onAmountChange}
                    value={amount}
                />
                <SingleDatePicker
                    date={createdAt}
                    onDateChange={this.onDateChange}
                    focused={this.state.calendarFocused}
                    onFocusChange={this.onFocusChange}
                    numberOfMonths={1}
                    isOutsideRange={() => false}
                />
                <textarea
                    className="textarea"
                    placeholder="Add a note for your description"
                    onChange={this.onNoteChange}
                    value={note}
                >
                </textarea>
                <div>
                    <button className="button">Save Expense</button>
                </div>
            </form>
        )
    }
}