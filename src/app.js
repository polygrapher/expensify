import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import configureStore from './store/configureStore';
import {addExpense} from './actions/expenses';
import {setTextFilter} from './actions/filters';
import getVisibleExpenses from './selectors/expenses';
import AppRouter from './routers/AppRouter';


const store = configureStore();

store.dispatch(addExpense({
    description: 'Water bill',
    amount: 100,
    createdAt: 1000
}));

store.dispatch(addExpense({
    description: 'Gas bill',
    amount: 200,
    createdAt: 1500
}));

store.dispatch(addExpense({
    description: 'Rent',
    amount: 100000,
    createdAt: 500
}));

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(jsx, document.querySelector('#app'));