var angular = require('angular');

function todoService($resource) {

    var _todos = [],
        todoRes;

    todoRes = $resource('/api/todos/:id', {
        id: '@_id'
    }, {
        update: { method: 'PUT' }
    });

    return {
        getAll: function getAll() {
            return _todos;
        },

        load: function load() {
            todoRes.get((data) => {
                _todos.push(...data.payload);
            });
            return _todos;
        },

        store: function store(params, callback) {
            var cb = callback || angular.noop;

            todoRes.save({}, params, (data) => {
                if (!data.error) {
                    _todos.push(data.payload);
                }
                cb(data.error, data.payload);
            });
        },

        reset: function reset() {
            _todos.length = 0;
        },

        get: function get(id) {
            var ret = null;
            _todos.some((el) => {
                if (el._id === id) {
                    ret = el;
                    return true;
                }
                return false;
            });
            return ret;
        },

        update: function update(id, data) {
            var todo = this.get(id);

            todoRes.update({id: id}, data, () => {
                angular.extend(todo, data || {});
            });
        },

        remove: function remove(id) {
            var idx = null;

            _todos.some((el, i) => {
                if (el._id === id) {
                    idx = i;
                    return true;
                }
                return false;
            });
            if (angular.isNumber(idx)) {
                todoRes.delete({id: id}, () => _todos.splice(idx, 1));
            }
        },

        getCompleted: function getComplete() {
            return _todos.filter(todo => todo.completed === true).length;
        }
    };

}

todoService.$inject = ['$resource'];

module.exports = todoService;