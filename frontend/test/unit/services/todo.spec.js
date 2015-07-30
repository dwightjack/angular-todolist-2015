/*global beforeEach, jasmine, describe, expect, it */

describe('todoService tests', () => {
    let todoService, $httpBackend;


    beforeEach(angular.mock.module(require('app/application').name));

    beforeEach(() => {

        angular.mock.inject(($injector) => {
            todoService = $injector.get('todoService');
            $httpBackend = $injector.get('$httpBackend');
            //force todo reset
            todoService.reset();
        });
    });

    it('should have a .getAll() method which returns an array', () => {
        expect(Array.isArray(todoService.getAll())).toBe(true);
    });

    it('should have a method to get a todo by its `_id` ', () => {

        let todos = [{
            _id: 1,
            title: 'test title',
            'descrition': 'description'
        }, {
            _id: 2,
            title: 'test title 2',
            'descrition': 'description'
        }];

        let storeTodo = function (todo, i) {
            let t = Object.assign({}, todo);
            if (t._id) {
                delete t._id;
            }
            $httpBackend.expectPOST('/api/todos', t).respond({error: false, payload: todos[i]});
            todoService.store(t);
            $httpBackend.flush();
        };

        todos.forEach(storeTodo);

        let testTodo = todoService.getAll()[1];

        expect(todoService.get(testTodo._id).title).toBe(testTodo.title);

    });

    it('should have a .store() method providing a callback with `success` and `storedTodo` arguments', () => {
        let toAdd = {title: 'A todo item'};
        let storeSpy = jasmine.createSpy('storeSpy');

        $httpBackend.expectPOST('/api/todos', toAdd).respond({error: false, payload: toAdd});
        todoService.store(toAdd, storeSpy);
        $httpBackend.flush();

        expect(todoService.getAll().length).toBe(1);
        expect(todoService.getAll()[0]).toEqual(toAdd);
        expect(storeSpy).toHaveBeenCalledWith(false, toAdd);



    });

    it('should have a .reset() method to clean up the todo array', () => {
        let toAdd = {title: 'another test'};

        $httpBackend.expectPOST('/api/todos', toAdd).respond({error: false, payload: toAdd});
        todoService.store(toAdd);
        $httpBackend.flush();

        expect(todoService.getAll().length).toBeGreaterThan(0);

        todoService.reset();

        expect(todoService.getAll().length).toBe(0);
    });

    it('counts completed todos in the stack', () => {
        let todos = [{
            _id: 1,
            title: 'title',
            completed: true
        }, {
            _id: 2,
            title: 'title',
            completed: false
        }];


        let storeTodo = function (todo, i) {
            let t = Object.assign({}, todo);
            if (t._id) {
                delete t._id;
            }
            $httpBackend.expectPOST('/api/todos', t).respond({error: false, payload: todos[i]});
            todoService.store(t);
            $httpBackend.flush();
        };

        todos.forEach(storeTodo);

        expect(todoService.getCompleted()).toBe(1);

    });

    it('should have a .load() method to load elements', () => {
        let todos = [{
            _id: 1,
            title: 'title'
        }, {
            _id: 1,
            title: 'title'
        }];

        $httpBackend.expectGET('/api/todos').respond({error: false, payload: todos});

        todoService.load();
        $httpBackend.flush();

        expect(todoService.getAll().length).toBe(2);
    });

});