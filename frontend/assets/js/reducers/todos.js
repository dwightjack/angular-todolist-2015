import {FETCH_TODOS_SUCCESS, ADD_TODO_REQUEST, ADD_TODO_SUCCESS, ADD_TODO_FAILURE} from '../actions/todo';

const initialState = {
    isSubmitting: false,
    todos: []
};

function todosReducer(state = initialState, action) {

    switch (action.type) {
    case FETCH_TODOS_SUCCESS:
        return Object.assign({}, state, {
            todos: action.response
        });

    case ADD_TODO_REQUEST:
        return Object.assign({}, state, {
            isSubmitting: true
        });

    case ADD_TODO_SUCCESS:
        return Object.assign({}, state, {
            todos: [...state.todos, action.response],
            isSubmitting: false
        });

    case ADD_TODO_FAILURE:
        return Object.assign({}, state, {
            isSubmitting: false
        });

    default:
        return state;
    }
}

export default todosReducer;