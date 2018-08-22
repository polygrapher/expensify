import {createStore, combineReducers} from 'redux';
import uuid from 'uuid';

// Add expense, this is an action generator

const addExpense = (
    {
        description = '',
        note = '',
        amount = 0,
        createdAt = 0
    } = {}
) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }
});

// Remove expense

const removeExpense = ({id} = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});

const editExense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

// Expenses reducer

const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch(action.type) {
        case 'ADD_EXPENSE':
            return [...state, action.expense];
        case 'REMOVE_EXPENSE':
            return state.filter(({id}) => id !== action.id);
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if (expense.id === action.id) {
                    return {...expense, ...action.updates};
                } else {
                    return expense;
                }
            });
        default:
            return state;
    }
}

// Filter action generators

const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
});

const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
});

const sortByDate = () => ({
    type: 'SORT_BY_DATE'
});

const setStartDate = (date) => ({
    type: 'SET_START_DATE',
    date
});

const setEndDate = (date) => ({
    type: 'SET_END_DATE',
    date
});

// Filters reducer

const filtersRducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
}

const filtersReducer = (state = filtersRducerDefaultState, action) => {
    switch(action.type) {
        case 'SET_TEXT_FILTER':
            return {...state, text: action.text}
        case 'SORT_BY_AMOUNT':
            return {...state, sortBy: 'amount'}
        case 'SORT_BY_DATE':
            return {...state, sortBy: 'date'}
        case 'SET_START_DATE':
            return {...state, startDate: action.date}
        case 'SET_END_DATE':
            return {...state, endDate: action.date}
        default:
            return state;
    }
}

const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
);

// Expense visibility filter
const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        const {description} = expense;
        const textMatch = !text || description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {
        if (sortBy === 'date') {
            return a.createdAt > b.createdAt ? -1 : 1;
        } else if (sortBy === 'amount') {
            return a.amount > b.amount ? -1 : 1;
        }
    });
}


store.subscribe(() => {
    const {expenses, filters} = store.getState();
    console.log(getVisibleExpenses(expenses, filters));
})

const expense = store.dispatch(addExpense({
    description: 'Rent',
    amount: 100,
    createdAt: 1000
}));

const expense2 = store.dispatch(addExpense({
    description: 'Coffee',
    amount: 200,
    createdAt: -2000
}));

// store.dispatch(removeExpense({
//     id: expense.expense.id
// }));

// store.dispatch(editExense(expense2.expense.id, {amount: 500}));

// store.dispatch(setTextFilter('coffee'));
// store.dispatch(setTextFilter());

// store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

// store.dispatch(setStartDate(1500));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(1250));

const demoStore = {
    expenses: [
        {
            id: 'asdasdasd',
            description: 'Description',
            note: 'This is a longer description after all',
            amount: 52000,
            createdAt: 0
        }
    ],
    filters: {
        text: 'rent',
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined
    }
}