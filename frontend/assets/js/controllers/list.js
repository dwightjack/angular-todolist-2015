class ListController {
    constructor(todoService) {
        this.todoService = todoService;
        this.todos = todoService.getAll();

        if (this.todos.length === 0) {
            todoService.load();
        }
    }

    toggleCompleted(todo) {
        this.todoService.update(todo._id, {completed: !todo.completed});
    }

    remove(todo) {
        this.todoService.remove(todo._id);
    }

}

module.exports = ListController;