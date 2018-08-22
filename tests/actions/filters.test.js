import moment from 'moment';
import { setStartDate, setEndDate, setTextFilter, sortByAmount, sortByDate } from '../../src/actions/filters';

test('should generate correct start date atcion', () => {
    const action = setStartDate(moment(0));

    expect(action).toEqual({
        type: 'SET_START_DATE',
        date: moment(0)
    })
});

test('should generate correct end date atcion', () => {
    const action = setEndDate(moment(0));

    expect(action).toEqual({
        type: 'SET_END_DATE',
        date: moment(0)
    })
});

test('should generate correct set text atcion with provided value', () => {
    const text = 'mei';
    const action = setTextFilter(text);

    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text
    })
});

test('should generate correct set text atcion with default', () => {
    const action = setTextFilter();

    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: ''
    })
});

test('should generate correct sort by amount action', () => {
    const action = sortByAmount();

    expect(action).toEqual({
        type: 'SORT_BY_AMOUNT'
    })
});

test('should generate correct sort by date action', () => {
    const action = sortByDate();

    expect(action).toEqual({
        type: 'SORT_BY_DATE'
    })
});