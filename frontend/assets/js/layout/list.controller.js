class ListController {
    constructor(todoService) {
        this.todoService = todoService;
        this.todos = todoService.getAll();
    }

    update(id, data) {
        this.todoService.update(id, data);
    }

    remove(id) {
        this.todoService.remove(id);
    }
}

ListController.$inject = ['todoService'];

module.exports = ListController;