import expnesesReducers from '../../src/reducers/expenses';
import expenses from '../fixtures/expenses';

test('should set default state', () => {
    const state = expnesesReducers(undefined, {type: '@@init'});
    expect(state).toEqual([]);
});

test('should remove expense by ID', () => {
    const state = expnesesReducers(expenses, {
        type: 'REMOVE_EXPENSE',
        id: expenses[1].id
    });

    expect(state).toEqual([expenses[0], expenses[2]]);
});

test('should not remove expense by incorrect ID', () => {
    const state = expnesesReducers(expenses, {
        type: 'REMOVE_EXPENSE',
        id: '-1'
    });

    expect(state).toEqual(expenses);
});

test('should add an expense', () => {
    const expense = {
        id: expect.any(String),
        description: 'game',
        amount: 1000,
        createdAt: 100,
        note: ''
    };
    const state = expnesesReducers(expenses, {
        type: 'ADD_EXPENSE',
        expense
    });

    expect(state[3]).toEqual(expense);
});

test('should update expense with correct ID', () => {
    const updates = {
        description: 'cat',
        amount: 3000,
        createdAt: 150,
        note: ''
    };
    const state = expnesesReducers(expenses, {
        type: 'EDIT_EXPENSE',
        id: '2',
        updates
    });

    expect(state[1]).toEqual({
        id: '2',
        ...updates
    });
});


test('should not update expense with incorrect ID', () => {
    const updates = {
        description: 'cat',
        amount: 3000,
        createdAt: 150,
        note: ''
    };
    const state = expnesesReducers(expenses, {
        type: 'EDIT_EXPENSE',
        id: '3213123',
        updates
    });

    expect(state).toEqual(expenses);
});