import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import configureStore from './store/configureStore';
import {startSetExpenses} from './actions/expenses';
import {setTextFilter} from './actions/filters';
import getVisibleExpenses from './selectors/expenses';
import AppRouter from './routers/AppRouter';
import firebase from './firebase/firebase';

const store = configureStore();

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(<p>Loading...</p>, document.querySelector('#app'));

store.dispatch(startSetExpenses()).then(() => {
    ReactDOM.render(jsx, document.querySelector('#app'));
}).catch((error) => {
    console.error('Failed to fetch expenses from firebase. ', error);
});