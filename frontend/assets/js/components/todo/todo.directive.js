module.exports = function myTodo() {

    return {
        restrict: 'AC',
        template: require('./todo.html'),
        replace: true,
        controllerAs: 'vm',
        controller: require('./todo.controller'),
        bindToController: true,
        scope: {
            todo: '=myTodoItem',
            onUpdate: '&',
            onRemove: '&'
        }
    }
};