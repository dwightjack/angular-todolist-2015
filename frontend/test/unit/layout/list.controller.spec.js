/*global beforeEach, jasmine, describe, expect, it */

describe('ListController tests', () => {
    let $controller, todoService, ctrl;

    beforeEach(angular.mock.module(require('app/application').name));

    beforeEach(() => {

        angular.mock.inject(($injector) => {
            $controller = $injector.get('$controller');
            todoService = $injector.get('todoService');

            ctrl = $controller('ListController', {
            });
        });

    });

    it('should proxy to todoService.update to update a todo by its id', () => {

        spyOn(todoService, 'update');

        const data = {
            title: 'test'
        };

        ctrl.update(10, data);

        expect(todoService.update).toHaveBeenCalledWith(10, data);
    });


    it('should proxy to todoService.remove to remove a todo by its id', () => {

        spyOn(todoService, 'remove');

        ctrl.remove(10);

        expect(todoService.remove).toHaveBeenCalledWith(10);
    });

});
