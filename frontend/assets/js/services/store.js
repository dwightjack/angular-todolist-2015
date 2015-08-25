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
        },

        listen(select, onChange) {
            let currentState;

            function handleChange() {
                let nextState = select(store.getState());
                if (nextState !== currentState) {
                    currentState = nextState;
                    onChange(currentState);
                }
            }

            let unsubscribe = store.subscribe(handleChange);
            handleChange();
            return unsubscribe;
        }
    };
}


export default appStore;