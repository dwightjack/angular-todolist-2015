describe('Form directive tests', () => {
    let $scope, compiledElement;

    beforeEach(angular.mock.module(require('app/application').name));

    beforeEach(() => {

        angular.mock.inject(($rootScope, $compile) => {
            $scope = $rootScope.$new();
            $scope.submitSpy = function submitSpy(data, cb=angular.noop) {
                cb();
            };
            spyOn($scope, 'submitSpy').and.callThrough();

            compiledElement = $compile('<div my-form on-submit="submitSpy(data, cb)"></div>')($scope);
        });

        $scope.$digest();

    });

    it('should contain a form tag', () => {

        expect(compiledElement[0].tagName).toBe('FORM');

    });

    it('should bind to a directive controller', () => {

        let controller = compiledElement.controller('myForm');

        expect(typeof controller.isSubmitting).toBe('boolean');

    });

    it('should pass a submit function to the controller instance', () => {

        let controller = compiledElement.controller('myForm');

        controller.onSubmit();

        expect($scope.submitSpy).toHaveBeenCalled();

    });


    it('should prevent form submission when form is invalid', () => {

        let controller = compiledElement.controller('myForm');

        controller.todoForm.$invalid = true;
        controller.submit();

        expect($scope.submitSpy).not.toHaveBeenCalled();

    });

    it('should allow one submission action at a time', () => {

        let controller = compiledElement.controller('myForm');

        controller.todoForm.$invalid = false;
        controller.isSubmitting = true;
        controller.submit();

        expect($scope.submitSpy).not.toHaveBeenCalled();

    });


    it('should submit form data and reset them', () => {

        let controller = compiledElement.controller('myForm');

        controller.todo = {
            title: 'test'
        };

        controller.todoForm.$invalid = false;
        controller.isSubmitting = false;
        controller.submit();

        expect($scope.submitSpy).toHaveBeenCalledWith({title: 'test'}, jasmine.any(Function));
        expect(controller.todo.title).toBe('');

    });


});
