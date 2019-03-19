import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {DateRangePicker} from 'react-dates';
import {setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate} from '../actions/filters';

export class ExpenseListFilters extends React.Component {
    state = {
        calendarFocused: null
    }

    onDatesChange = ({startDate, endDate}) => {
        this.props.setStartDate(startDate);
        this.props.setEndDate(endDate);
    }

    onFocusChange = (calendarFocused) => {
        this.setState(() => ({calendarFocused}));
    }

    onTextChange = (e) => {
        this.props.setTextFilter(e.target.value);
    }

    onSortChange = (e) => {
        e.target.value === 'date' ? this.props.sortByDate() : this.props.sortByAmount()
    }

    render() {
        return (
            <div className="content-container">
                <div className="input-group">
                    <div className="input-group__item">
                        <input type="text" className="text-input" placeholder="Search Expenses" value={this.props.filters.text} onChange={this.onTextChange}/>
                    </div>
                    <div className="input-group__item">
                        <select className="select" value={this.props.filters.sortBy} onChange={this.onSortChange}>
                            <option value="date">Date</option>
                            <option value="amount">Value</option>
                        </select>
                    </div>
                    <div className="input-group__item">
                        <DateRangePicker
                            startDate={this.props.filters.startDate} // momentPropTypes.momentObj or null,
                            startDateId="expenseFiltersStartDate" // PropTypes.string.isRequired,
                            endDate={this.props.filters.endDate} // momentPropTypes.momentObj or null,
                            endDateId="expenseFiltersEndDate" // PropTypes.string.isRequired,
                            onDatesChange={this.onDatesChange} // PropTypes.func.isRequired,
                            focusedInput={this.state.calendarFocused} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                            onFocusChange={this.onFocusChange} // PropTypes.func.isRequired,
                            showClearDates={true}
                            numberOfMonths={1}
                            isOutsideRange={() => false}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({filters}) => (
    {filters}
);

const mapDispatchToProps = ((dispatch) => bindActionCreators({
    setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate
}, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);
