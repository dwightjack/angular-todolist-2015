module.exports = function myTodo() {

    return {
        restrict: 'AE',
        template: require('./form.html'),
        replace: true,
        controllerAs: 'vm',
        controller: require('./form.controller'),
        bindToController: true,
        scope: {
            onSubmit: '&'
        }
    };

};