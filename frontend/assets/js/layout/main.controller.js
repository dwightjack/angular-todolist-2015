class MainController {
    constructor(todoService, appStore, todoActionCreator) {
        this.todos = appStore.getState().todos;
        this.appStore = todoService;
        this.todoActionCreator = todoActionCreator;
        this.appStore = appStore;
        appStore.dispatch(todoActionCreator.fetchTodos()).then(() => {
            this.todos = appStore.getState().todos;
        });
    }

    getTotal() {
        return this.todos.length;
    }

    getCompleted() {
        return this.appStore.getCompleted();
    }

    getPercentage() {
        var total = this.getTotal();
        if (total === 0) {
            return 0;
        }
        return this.getCompleted() * 100 / total;
    }

    addTodo(data) {
        this.appStore.dispatch(this.todoActionCreator.storeTodo(data)).then(() => {
            this.todos = this.appStore.getState().todos;
        });
    }

}

MainController.$inject = ['todoService', 'appStore', 'todoActionCreator'];


export default MainController;