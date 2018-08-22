import {editExpense, addExpense} from '../../src/actions/expenses';

test('should generate editExpense action object', () => {
    const actionObject = editExpense('testID', {'note': 'Note'});
    expect(actionObject).toEqual({
        type: 'EDIT_EXPENSE',
        id: 'testID',
        updates: {
            note: 'Note'
        }
    });
});

test('should setup add expense action object with expense data', () => {
    const expense = {
        description: 'Rent',
        note: 'This is a note',
        amount: 1000,
        createdAt: 2000
    };

    const action = addExpense(expense);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            id: expect.any(String),
            ...expense
        }
    })
});

test('should setup add expense action object with default values', () => {
    const expense = {
        description: '',
        note: '',
        amount: 0,
        createdAt: 0
    };

    const action = addExpense();
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            id: expect.any(String),
            ...expense
        }
    })
});