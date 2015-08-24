import { createStore, applyMiddleware } from 'redux';
import callAPIMiddleware from '../base/middleware';
import todosReducer from '../reducers/todos';

function appStore() {

    const createStoreWithMiddleware = applyMiddleware(
        callAPIMiddleware
    )(createStore);

    const store = createStoreWithMiddleware(todosReducer);

    return {
        getState() {
            return store.getState();
        },

        dispatch(action) {
            return store.dispatch(action);
        }
    };
}


export default appStore;