var noop = require('angular').noop;

class MainController {
    constructor(todoService) {
        this.todoService = todoService;
        todoService.load();
    }

    getTotal() {
        return this.todoService.getAll().length;
    }

    getCompleted() {
        return this.todoService.getCompleted();
    }

    getPercentage() {
        var total = this.getTotal();
        if (total === 0) {
            return 0;
        }
        return this.getCompleted() * 100 / total;
    }

    addTodo(data, cb=noop) {
        this.todoService.store(data, cb);
    }

}

MainController.$inject = ['todoService'];


module.exports = MainController;