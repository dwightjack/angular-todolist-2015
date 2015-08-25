import formTemplate from './form.html';
import FormController from './form.controller';

function myForm() {

    return {
        restrict: 'AE',
        template: formTemplate,
        replace: true,
        controllerAs: 'vm',
        controller: FormController,
        bindToController: true,
        scope: {
            onSubmit: '&'
        }
    };

}

export default myForm;