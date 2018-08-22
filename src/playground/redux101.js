import {createStore} from 'redux';

/**
 * Action generators:
 * - abstracts away creation of the actual action object, thus
 * taking away the possibility of typos.
 * - making an error while typing in action generator will actually
 * cause error while mistyped action type will silently fail.
 */

 const incrementCount = ({incrementBy = 1} = {}) => ({
    type: 'INCREMENT',
    incrementBy
 });

 /**
  *  First, default value for object is set (empty object) and then
  * we check if decrementBy property exists. If it doesn't - default
  * value for it is used.
  */
 const decrementCount = ({decrementBy = 1} = {}) => ({
    type: 'DECREMENT',
    decrementBy
 });

 const resetCount = () => ({
    type: 'RESET'
 });

 const setCount = ({count} = {}) => ({
    type: 'SET',
    count
 });

 // Reducers

 const counterReducer = (state = {count: 0}, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return {
                count: state.count + action.incrementBy
            }
        case 'DECREMENT':
            return {
                count: state.count - action.decrementBy
            }
        case 'SET':
            return {
                count: action.count
            }
        case 'RESET':
            return {
                count: 0
            }
        default:
            return state;
    }
    return state;
};

const store = createStore(counterReducer);

const unsubscribe = store.subscribe(() => {
    console.log('First subscriber');
    console.log(store.getState());
});

store.dispatch(incrementCount({incrementBy: 5}));

store.dispatch(incrementCount());
store.dispatch(resetCount());
store.dispatch(decrementCount({decrementBy: 10}));
store.dispatch(decrementCount());
store.dispatch(setCount({count: 101}))