var angular = require('angular');

class FormController {

    constructor() {
        this.isSubmitting = false;
    }

    submit() {
        if (this.isSubmitting || this.todoForm.$invalid) {
            return false;
        }
        this.isSubmitting = true;

        this.onSubmit({
            data: angular.copy(this.todo),
            cb: () => {
                this.isSubmitting = false;
                this.todo.title = '';
            }
        });
    }
}

module.exports = FormController;