class FormController {
    constructor(todoService) {
        this.todoService = todoService;
        this.isSubmitting = false;
    }

    submitForm() {
        if (this.todoForm.$invalid !== true) {
            this.isSubmitting = true;
            this.todoService.store(this.todo, () => {
                this.isSubmitting = false;
            });
        }
    }
}

module.exports = FormController;