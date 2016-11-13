Template.taskList.helpers({
    tasks() {
        return Tasks.find({});
    },

    /*tasks() {
     const instance = Template.instance();
     if (instance.state.get('hideCompleted')) {
     return Tasks.find({checked: {$ne: true}}, {sort: {createdAt: -1}});
     }
     return Tasks.find({},
     {sort: {createdAt: -1}});
     },*/
});

Template.task.helpers({
    car() {
        return Cars.findOne(this.carId)
    },
    location() {
        return Locations.findOne(this.locationId)
    },
});

Template.carSelect.helpers({
    cars() {
        return Cars.find({});
    },
});

Template.locationSelect.helpers({
    locations() {
        return Locations.find({});
    },
});

Template.taskList.events({
    'submit .new-task'(event){
        event.preventDefault();

        let target = event.target;

            Tasks.insert({
                taskName: target.taskName.value,
                carId: target.carId.value,
                locationId: target.locationId.value,
                createdAt: new Date(),
            });

        target.taskName.value = '';
    },
    'click .editTask'(event){
        event.preventDefault();
        taskId = event.target.getAttribute('task-id');

        Session.set('selectedTaskId', taskId);
        $('#editTask').modal('show');
    },
    'click .deleteTask': function (event) {
        event.preventDefault();
        Tasks.remove(this._id);
    },
    'change .hide-completed input'(event, instance) {
        instance.state.set('hideCompleted', event.target.checked)
    }
});

Template.taskEditForm.helpers({
    task: function () {
        let taskId = Session.get('selectedTaskId');

        if (typeof taskId !== "undefined") {
            let task = Tasks.findOne(taskId);
            return task;
        }
    },
    car: function () {
        let taskId = Session.get('selectedTaskId');
        let carId = task.carId;

        if (typeof taskId !== "undefined") {
            let car = Car.findOne(carId);
            console.log(car);
            return car;
        }
    }
});


Template.taskEditForm.events({
    // Modal
    'click .submit': function (e) {
        e.preventDefault();

        let currentCarId = Session.get('selectedCarId');

        let colorIdSelect = document.querySelector('#editCar .idColor').value;

        let colorObject = Colors.findOne(colorIdSelect);

        let carProperties = {
            make: document.getElementById('make').value,
            model: document.getElementById('model').value,
            plate: document.getElementById('plate').value,
            color: {
                colorId: colorIdSelect,
                colorName: colorObject.colorName,
                colorCode: colorObject.colorCode,
            },
        };


        Cars.update(currentCarId, {$set: carProperties}, function (error) {
            if (error) {
                // display the error to the user
                alert(error.reason);
            } else {
                Router.go('carList', {_id: currentCarId});
            }
        });

        $('#editCar').modal('hide');
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