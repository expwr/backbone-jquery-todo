var Todo = Backbone.Model.extend({
    defaults: {
        id: '',
        title: '',
        description: '',
        completed: false,
    }
})

var Todos = Backbone.Collection.extend({
    model: Todo
});

var todo1 = new Todo({
    id: 1,
    title: 'Task 1',
    description: 'Description 1',
    completed: false
})

var todo2 = new Todo({
    id: 2,
    title: 'Task 2',
    description: 'Description 2',
    completed: false

})

var TodoView = Backbone.View.extend({
    initialize: function() {
        this.render()
    },
    tagName: 'tr',
    template: _.template($('#todos-list-template').html()),
    events: {
        'click .edit-task': 'edit',
        'click .update-task': 'update',
        'click .cancel-task': 'cancel',
        'click .delete-task': 'delete',
    },
    edit: function() {
        this.$('.edit-task').hide();
        this.$('.delete-task').hide();
        this.$('.update-task').show();
        this.$('.cancel').show();

        var title = this.$('.title').html();
        var description = this.$('.description').html();

        this.$('td:first-child').html('<input type="text" class="form-control title-update" value="' + title + '">');
        this.$('td:nth-child(2)').html('<input type="text" class="form-control description-update" value="' + description + '">');
    },
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
});

var todos = new Todos();

var AppView = Backbone.View.extend({
    render: function() {
        this.collection.each(function(todo) {
            var todoView = new TodoView({ model: todo });
            this.$('.todos-list').append(todoView.el);
        }, this);
    },
    el: '#app',
    events: {
        'click .add-task': 'addTodo'
    },
    initialize: function() {
        this.inputTask = this.$('.task-input');
        this.inputDescription = this.$('.description-input');
    },
    addTodo: function(e) {
        e.preventDefault();
        var todoModel = new Todo({
            title: this.inputTask.val().trim(),
            description: this.inputDescription.val().trim()
        });
        console.log("todoModel");
        todos.add(todoModel);
        this.inputTask.val('');
        this.inputDescription.val('');
    }
});

var todos = new Todos(todo1, todo2);

var appView = new AppView({ collection: todos });
appView.render();
var todosView = new TodoView({ collection: todos });