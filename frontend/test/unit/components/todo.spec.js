describe('Todo item directive tests', () => {
    let $scope, compiledElement, submitSpy, controller;

    beforeEach(angular.mock.module(require('app/application').name));

    beforeEach(() => {

        angular.mock.inject(($rootScope, $compile) => {
            $scope = $rootScope.$new();
            $scope.onUpdateSpy = jasmine.createSpy('onUpdateSpy');
            $scope.onRemoveSpy = jasmine.createSpy('onRemoveSpy');
            $scope.todo = {
                _id: 5,
                title: 'test',
                completed: false
            };
            compiledElement = $compile('<div my-todo on-update="onUpdateSpy(id, data)" my-todo-item="todo" on-remove="onRemoveSpy(id)"></div>')($scope);
        });

        $scope.$digest();

        controller = compiledElement.controller('myTodo')

    });

    describe('Directive Bindings', () => {


        it('should pass a remove function to the controller instance', () => {

            controller.onRemove({id: 10});

            expect($scope.onRemoveSpy).toHaveBeenCalledWith(10);

        });

        it('should pass an update function to the controller instance', () => {

            let data = {
                title: 'yeah'
            };

            controller.onUpdate({id: 5, data: data});

            expect($scope.onUpdateSpy).toHaveBeenCalledWith(5, data);

        });

    });


    describe('Controller Tests', () => {

        it('should have a toggleComplete method which invokes .onUpdate() scope method with the current todo _id', () => {

            controller.toggleCompleted();

            expect($scope.onUpdateSpy).toHaveBeenCalledWith($scope.todo._id, jasmine.any(Object));

        });

        it('should have a remove method which invokes .onRemove() scope method with the current todo _id ', () => {

            controller.remove();

            expect($scope.onRemoveSpy).toHaveBeenCalledWith($scope.todo._id);

        });

    });

    describe('DOM Interactions', () => {

        it('should toggle `todo-completed` class and check checkbox when `todo.completed` changes', () => {

            let checkbox = compiledElement[0].querySelector('#completed');

            expect(compiledElement.hasClass('todo-completed')).toBe(false);
            expect(checkbox.checked).toBe(false);

            controller.todo.completed = true;

            $scope.$digest();
            expect(checkbox.checked).toBe(true);
            expect(compiledElement.hasClass('todo-completed')).toBe(true);

        });

        it('should call .toggleCompleted() on checkbox click', () => {

            spyOn(controller, 'toggleCompleted');

            let completed = compiledElement[0].querySelector('#completed');

            completed.click();

            expect(controller.toggleCompleted).toHaveBeenCalled();

        });

        it('should call .toggleCompleted() when item title is clicked', () => {

            spyOn(controller, 'toggleCompleted').and.callThrough();

            let heading = compiledElement[0].querySelector('h1');

            angular.element(heading).triggerHandler('click');

            expect(controller.toggleCompleted).toHaveBeenCalled();

        });


        it('should call .remove() when remove icon is clicled', () => {

            spyOn(controller, 'remove');

            let removeIcon = compiledElement[0].querySelector('.glyphicon-trash');

            angular.element(removeIcon).triggerHandler('click');

            expect(controller.remove).toHaveBeenCalled();

        });

    });


});
