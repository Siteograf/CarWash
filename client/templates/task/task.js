Meteor.subscribe('tasks');

Template.taskList.helpers({
    tasks() {
        return Tasks.find({}, {sort: {createdAt: -1}});
    },

    // tasks() {
    //     const instance = Template.instance();
    //     if (instance.state.get('hideCompleted')) {
    //         return Tasks.find({checked: {$ne: true}}, {sort: {createdAt: -1}});
    //     }
    //     return Tasks.find({},
    //         {sort: {createdAt: -1}});
    // },
});




Template.task.helpers({
    car() {
        return Cars.findOne(this.carId)
    },
    location() {
        return Locations.findOne(this.locationId)
    },
});


Template.insertTaskForm.rendered = function(){
    $(".select2").select2({
        // theme: "classic"
    });
};

Template.updateTaskForm.rendered = function(){
    $(".select2").select2({
        // theme: "classic"
    });
};

Template.taskList.events({
    'click .editTask'(event){
        event.preventDefault();
        let taskId = event.target.getAttribute('task-id');

        Session.set('selectedTaskId', taskId);
        $('#updateTaskFormWrapper').modal('show');
    },
    'click .deleteTask': function (event) {
        event.preventDefault();
        Tasks.remove(this._id);
    },
    'change .hide-completed input'(event, instance) {
        instance.state.set('hideCompleted', event.target.checked)
    }
});

Template.updateTaskForm.helpers({
    currentTask: function () {
        let taskId = Session.get('selectedTaskId');

        if (typeof taskId !== "undefined") {
            let task = Tasks.findOne(taskId);
            return task;
        }
    },

});


Template.updateTaskFormWrapper.events({
    // Modal
    'click .submit': function (e) {
        $('#updateTaskFormWrapper').modal('hide');
    },

    'click .delete': function (e) {
        e.preventDefault();

        if (confirm("Delete this post?")) {
            let currentPostId = this._id;
            Posts.remove(currentPostId);
            Router.go('postsList');
        }
    }
});
