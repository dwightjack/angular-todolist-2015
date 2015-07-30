/*global beforeEach, jasmine, describe, expect, it */

describe('MainController tests', () => {
    let $controller, todoService, ctrl;

    beforeEach(angular.mock.module(require('app/application').name));

    beforeEach(() => {

        angular.mock.inject(($injector) => {
            $controller = $injector.get('$controller');
            todoService = $injector.get('todoService');

            ctrl = $controller('MainController', {
            });
        });

    });

    it('should proxy to service method to get completed tasks', () => {

        spyOn(todoService, 'getCompleted');

        ctrl.getCompleted();

        expect(todoService.getCompleted).toHaveBeenCalled();
    });

    it('should proxy to service method to get total tasks', () => {

        spyOn(todoService, 'getAll').and.returnValue([]);

        ctrl.getTotal();

        expect(todoService.getAll).toHaveBeenCalled();
    });


    it('should return the percentage of completed tasks using .getTotal() and .getCompleted()', () => {

        spyOn(ctrl, 'getTotal').and.returnValue(10);

        spyOn(ctrl, 'getCompleted').and.returnValue(5);

        let percentage = ctrl.getPercentage();

        expect(percentage).toBe(50);
        expect(ctrl.getTotal).toHaveBeenCalled();
        expect(ctrl.getCompleted).toHaveBeenCalled();
    });


    it('should add a todo by proxying todoService.store with optional callback', () => {

        spyOn(todoService, 'store');

        let data = {
            title: 'test'
        };

        //call without callback
        ctrl.addTodo(data);
        expect(todoService.store).toHaveBeenCalledWith(data, angular.noop);

        todoService.store.calls.reset();

        //call with callback
        let cb = function () {};
        ctrl.addTodo(data, cb);
        expect(todoService.store).toHaveBeenCalledWith(data, cb);
    });

});
