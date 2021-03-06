import {
    editExpense,
    startEditExpense,
    addExpense,
    startAddExpense,
    setExpenses,
    startSetExpenses,
    startRemoveExpense
} from '../../src/actions/expenses';
import expenses from '../fixtures/expenses';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import database from '../../src/firebase/firebase';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

// Test data
const uid = 'thisismytestuid';
const defaultAuthStore = {auth: {uid}}

beforeEach(() => {
    const expensesData = {};
    expenses.forEach(({id, description, createdAt, note, amount}) => {
        expensesData[id] = {description, createdAt, note, amount};
    });
    return database.ref(`users/${uid}/expenses`).set(expensesData);
});

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
    const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
    })
});

test('should add expanses to database and store', () => {
    const store = mockStore(defaultAuthStore),
        expense = {
            description: 'Rent',
            amount: 100000,
            note: 'Note',
            createdAt: 2342342
        };

    return store.dispatch(startAddExpense(expense))
        .then(() => {
            const actions = store.getActions();
            expect(actions[0]).toEqual({
                type: 'ADD_EXPENSE',
                expense: {
                    id: expect.any(String),
                    ...expense
                }
            });

            return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
        }).then((snapshot) => {
            expect(expense).toEqual(snapshot.val());
        });
});

test('should add expense with default values to database and store', () => {
    const store = mockStore(defaultAuthStore),
        defaultExpense = {
            description: '',
            note: '',
            amount: 0,
            createdAt: 0
        };

    return store.dispatch(startAddExpense())
        .then(() => {
            const actions = store.getActions();

            expect(actions[0]).toEqual({
                type: 'ADD_EXPENSE',
                expense: {
                    id: expect.any(String),
                    ...defaultExpense
                }
            });

            return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
        }).then((snapshot) => {
            expect(snapshot.val()).toEqual(defaultExpense);
        });
});

test('should setup a set expense action object', () => {
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    });
});

test('should fetch expenses from firebase', () => {
    const store = mockStore(defaultAuthStore);
    return store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        })
    });
});

test('should remove expense from firebase', () => {
    const store = mockStore(defaultAuthStore),
        id = expenses[0].id;

    return store.dispatch(startRemoveExpense({id})).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'REMOVE_EXPENSE',
            id
        });
        return database.ref(`users/${uid}/expenses/${id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toBeFalsy();
    });
});

test('should update expense in firebase', () => {
    const store = mockStore(defaultAuthStore),
        id = expenses[0].id,
        updates = {
            description: 'test description',
            amount: 10,
            note: 'test',
            createdAt: 0
        }

    return store.dispatch(startEditExpense(id, updates)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'EDIT_EXPENSE',
            id,
            updates
        });
        return database.ref(`users/${uid}/expenses/${id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(updates);
    });
});