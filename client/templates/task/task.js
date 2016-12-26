Meteor.subscribe('tasks');

// ==== taskList =============================================================================
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

Template.task.events({
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

    'click .setTime'(event){
        event.preventDefault();
        let taskId = event.target.getAttribute('task-id');

        Session.set('selectedTaskId', taskId);

        $('#setTimeTaskForm').modal('show');
    },

});


// ==== task =============================================================================

Template.task.helpers({
    car() {
        return Cars.findOne(this.carId);
    },

    // Border color for preview color circle
    darkenColor(){
        let currentCar = Cars.findOne(this.carId);
        let currentColor = currentCar.color.colorCode;

        // Change color
        function shadeColor1(color, percent) {
            var num = parseInt(color.slice(1), 16), amt = Math.round(2.55 * percent), R = (num >> 16) + amt, G = (num >> 8 & 0x00FF) + amt, B = (num & 0x0000FF) + amt;
            return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 + (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
        }

        // Minus - dark, Plus - light
        return shadeColor1(currentColor, -10);
    },

    location() {
        return Locations.findOne(this.locationId);
    },

    setTimeButtonClass(){
        if (this.executorTime) {
            return "btn-primary";
        }
        return "btn-outline-primary";
    },

    approveButtonClass(){
        if (this.executorTime) {
            return "btn btn-outline-success";
        }
        return "btn btn-outline-secondary disabled";
    },

});

// ==== insertTaskForm =============================================================================

Template.insertTaskForm.rendered = function () {
    // $(".select2").select2({
    //     // theme: "classic"
    // });
};

// ==== updateTaskForm =============================================================================

Template.updateTaskForm.events({
    // Modal
    'click .submit': function (e) {
        console.log('upd');
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

Template.updateTaskForm.rendered = function () {
    // $(".select2").select2({
    //     // theme: "classic"
    // });
};

Template.updateTaskForm.helpers({
    currentTask: function () {
        let taskId = Session.get('selectedTaskId');

        if (typeof taskId !== "undefined") {
            let task = Tasks.findOne(taskId);
            return task;
        }
    },
});


Template.setTimeTaskForm.helpers({
    currentTask: function () {
        let taskId = Session.get('selectedTaskId');

        if (typeof taskId !== "undefined") {
            let task = Tasks.findOne(taskId);
            return task;
        }
    },

    approveButtonClass(){
        if (this.executorTime) {
            return "btn btn-outline-success";
        }
        return "btn btn-outline-secondary disabled";
    },

});

Template.setTimeTaskForm.events({
    // Modal
    'click .submit': function (e) {
        // $('#setTimeTaskForm').modal('hide');
    },
});

Tasks.before.insert(function (userId, doc) {
    doc.createdAt = Date.now();
    doc.ownerId = Meteor.userId();
});

Tasks.before.update(function (userId, doc, fieldNames, modifier, options) {
    modifier.$set = modifier.$set || {};
    modifier.$set.updatedAt = Date.now();
});


/*
 Template.taskInfo.helpers({

 currentTask: function () {
 let taskId = Session.get('selectedTaskId');
 if (typeof taskId !== "undefined") {
 let task = Tasks.findOne(taskId);
 return task;
 }
 },

 car() {
 let taskId = Session.get('selectedTaskId');
 if (typeof taskId !== "undefined") {
 let task = Tasks.findOne(taskId);
 return Cars.findOne(task.carId);
 }
 },

 location() {
 let taskId = Session.get('selectedTaskId');
 if (typeof taskId !== "undefined") {
 let task = Tasks.findOne(taskId);
 return Locations.findOne(task.locationId);
 }

 },

 });*/
