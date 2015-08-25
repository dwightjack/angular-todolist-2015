class TodoController {

    toggleCompleted() {
        this.onUpdate({id: this.todo._id, data: {completed: !this.todo.completed}});
    }

    remove() {
        this.onRemove({id: this.todo._id});
    }
}

export default TodoController;