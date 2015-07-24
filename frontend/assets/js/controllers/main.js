class MainController {
    constructor(todoService) {
        this.todoService = todoService;
    }

    getTotal() {
        return this.todoService.getAll().length;
    }

    getCompleted() {
        return this.todoService.getCompleted();
    }

    getPercentage() {
        var total = this.todoService.getAll().length;
        if (total === 0) {
            return 0;
        } else {
            return this.getCompleted() * 100 / total;
        }
    }

}


module.exports = MainController;