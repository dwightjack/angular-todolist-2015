function todoApiService($resource) {

    var todoRes;

    todoRes = $resource('/api/todos/:id', {
        id: '@_id'
    }, {
        update: { method: 'PUT' }
    });

    return {

        load() {
            return todoRes.get().$promise.then(data =>  data.payload);
        },

        store(params) {
            return todoRes.save({}, params).$promise.then(data => data.payload, data => data.error);
        },

        update(id, data) {
            return todoRes.update({id: id}, data).$promise.then(() => data, response => response.error);
        },

        remove(id) {
            return todoRes.delete({id: id}).$promise.then(data => data.payload, data => data.error);
        },

        getCompleted(todos) {
            return todos.filter((todo) => todo.completed === true).length;
        }

    };
}

todoApiService.$inject = ['$resource'];

export default todoApiService;