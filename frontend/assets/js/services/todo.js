function todoService($resource) {

    var _todos = [];

    var todoRes = $resource('/api/todos/:id', {
        id: '@_id'
    }, {
        update: { method: 'PUT' }
    });

    return {
        getAll: function () {
            return _todos;
        },

        load: function () {
            todoRes.get(function (data) {
                _todos.push.apply(_todos, data.payload);
            });
            return _todos;
        },

        store: function (params, callback) {
            var cb = callback || angular.noop;

            todoRes.save({}, params, function (data) {
                if (!data.error) {
                    _todos.push(data.payload);
                }
                cb(data.error, data.payload);
            });
        },

        reset: function () {
            _todos.length = 0;
        },

        get: function (id) {
            var ret = null;
            _todos.some(function (el) {
                if (el._id === id) {
                    ret = el;
                    return true;
                }
                return false;
            });
            return ret;
        },

        update: function (id, data) {
            var todo = this.get(id);

            todoRes.update({id: id}, data, function () {
                angular.extend(todo, data || {});
            });
        },

        remove: function (id) {
            var idx = null;

            _todos.some(function (el, i) {
                if (el._id === id) {
                    idx = i;
                    return true;
                } else {
                    return false;
                }
            });
            if (angular.isNumber(idx)) {
                todoRes.delete({id: id}, function () {
                    _todos.splice(idx, 1);
                });
            }
        },

        getCompleted: function () {
            return _todos.filter(function (todo) {
                return todo.completed === true;
            }).length;
        }
    };

}

module.exports = todoService;