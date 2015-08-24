class ListController {

    constructor(appStore, todoActionCreator) {
        this.appStore = appStore;
        this.todoActionCreator = todoActionCreator;
    }

    update(id, data) {
        this.appStore.dispatch(todoActionCreator.updateTodo(id, data));
    }

    remove(id) {
        this.appStore.dispatch(todoActionCreator.removeTodo(id));
    }
}

ListController.$inject = ['appStore', 'todoActionCreator'];

export default ListController;