var copy = require('angular').copy;

class FormController {

    constructor(storeService) {
        this.appStore = storeService;
    }

    isSubmitting() {
        return this.appStore.getState().isSubmitting;
    }

    submit() {
        if (this.isSubmitting() || this.todoForm.$invalid) {
            return false;
        }

        this.onSubmit({
            data: copy(this.todo),
            cb: () => {
                this.todo.title = '';
            }
        });
    }
}

FormController.$inject = ['storeService'];

module.exports = FormController;