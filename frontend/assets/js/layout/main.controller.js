class MainController {
    constructor(todoApiService, appStore, todoActionCreator) {
        this.todos = appStore.getState().todos;
        this.todoApiService = todoApiService;
        this.appStore = appStore;
        this.todoActionCreator = todoActionCreator;
        this.appStore = appStore;

        appStore.listen((state) => state.todos.length, () => this.todos = appStore.getState().todos);

        appStore.dispatch(todoActionCreator.fetchTodos());

    }

    getTotal() {
        return this.todos.length;
    }

    getCompleted() {
        return this.todoApiService.getCompleted(this.todos);
    }

    getPercentage() {
        var total = this.getTotal();
        if (total === 0) {
            return 0;
        }
        return this.getCompleted() * 100 / total;
    }

    addTodo(data, cb) {
        this.appStore.dispatch(this.todoActionCreator.storeTodo(data)).then(cb);
    }

}

MainController.$inject = ['todoApiService', 'appStore', 'todoActionCreator'];


export default MainController;