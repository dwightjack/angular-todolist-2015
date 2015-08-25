import TodoController from './todo.controller';
import todoTemplate from './todo.html';

function myTodo() {

    return {
        restrict: 'EA',
        template: todoTemplate,
        replace: true,
        controllerAs: 'vm',
        controller: TodoController,
        bindToController: true,
        scope: {
            todo: '=myTodoItem',
            onUpdate: '&',
            onRemove: '&'
        }
    };

}

export default  myTodo;