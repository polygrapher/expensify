import moment from 'moment';
import expensesTotalSelector from '../../src/selectors/expensesTotal';
import expenses from '../fixtures/expenses';

test('should return 0 if empty array is passed in', () => {
    const expenses = [];
    const result = expensesTotalSelector(expenses);
    expect(result).toBe(0);
});

test('should return correct sum if only one expense is present', () => {
    const result = expensesTotalSelector([expenses[0]]);
    expect(result).toBe(expenses[0].amount);
});

test('should return correct sum several expenses', () => {
    const expectedSum = expenses[0].amount + expenses[1].amount;
    const result = expensesTotalSelector([expenses[0], expenses[1]]);
    expect(result).toBe(expectedSum);
});