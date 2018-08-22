import moment from 'moment';
import filtersReducer from '../../src/reducers/filters';

test('should set default values', () => {
    const state = filtersReducer(undefined, {type: '@@init'});

    expect(state.sortBy).toBe('date');
});

test('should set sortBy to `amount`', () => {
    const state = filtersReducer(undefined, {type: 'SORT_BY_AMOUNT'});

    expect(state.sortBy).toBe('amount');
});

test('should set sortBy to `date`', () => {
    const state = filtersReducer({
        text: '',
        sortBy: 'amount',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    }, {type: 'SORT_BY_DATE'});

    expect(state.sortBy).toBe('date');
});

test('should set text filter to correct value', () => {
    const text = 'mei';
    const state = filtersReducer(undefined, {
        type: 'SET_TEXT_FILTER',
        text
    });

    expect(state.text).toBe(text);
});

test('should set startDate filter', () => {
    const date = moment(0);
    const state = filtersReducer(undefined, {
        type: 'SET_START_DATE',
        date
    });

    expect(state.startDate).toEqual(date);
});

test('should set endDate filter', () => {
    const date = moment(0);
    const state = filtersReducer(undefined, {
        type: 'SET_END_DATE',
        date
    });

    expect(state.endDate).toEqual(date);
});