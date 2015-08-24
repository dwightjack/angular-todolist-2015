import * as actions from '../actions/todo';

function todoActionCreator(todoApiService) {

    return {

        fetchTodos() {
            return {
                types: [actions.FETCH_TODOS_REQUEST, actions.FETCH_TODOS_SUCCESS, actions.FETCH_TODOS_FAILURE],
                shouldCallAPI: (state) => !(Array.isArray(state.todos) && state.todos.length > 0),
                callAPI: () => todoApiService.load(),
                payload: {}
            };
        },

        storeTodo(data) {
            return {
                types: [actions.ADD_TODO_REQUEST, actions.ADD_TODO_SUCCESS, actions.ADD_TODO_FAILURE],
                shouldCallAPI: (state) => !state.isSubmitting,
                callAPI: () => todoApiService.store(data),
                payload: {data}
            };
        },

        removeTodo(id) {
            return {
                types: [actions.REMOVE_TODO_REQUEST, actions.REMOVE_TODO_SUCCESS, actions.REMOVE_TODO_FAILURE],
                shouldCallAPI: (state) => !!(state.todos.find(todo => todo._id === id)),
                callAPI: () => todoApiService.remove(id),
                payload: {id}
            };
        },

        updateTodo(id, data) {
            return {
                types: [actions.UPDATE_TODO_REQUEST, actions.UPDATE_TODO_SUCCESS, actions.UPDATE_TODO_FAILURE],
                shouldCallAPI: (state) => !!(state.todos.find(todo => todo._id === id)),
                callAPI: () => todoApiService.update(id, data),
                payload: {id, data}
            };
        }

    };

}

todoActionCreator.$inject = ['todoApiService'];


export default todoActionCreator;