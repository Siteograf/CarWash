Meteor.subscribe('cars');


Template.carList.helpers({
    cars() {
        return Cars.find({}, {sort: {createdAt: -1}});
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

Template.carList.events({
    'click .editCar'(event){
        event.preventDefault();
        carId = event.target.getAttribute('car-id');

        // ModalHelper.openModalFor(animalId);
        Session.set('selectedCarId', carId);
        // Modal.show('animalsModal');
        $('#updateCarFormWrapper').modal('show');
    },
    'change .hide-completed input'(event, instance) {
        instance.state.set('hideCompleted', event.target.checked)
    }
});


AutoForm.hooks({
    insertCarForm: {
        before: {
            insert: function (doc) {
                let colorId = AutoForm.getFieldValue('color', 'insertCarForm').colorId;
                let color = Colors.findOne(colorId);
                doc.color.colorName = color.colorName;
                doc.color.colorCode = color.colorCode;
                return doc; //autoFrom magic commence
            }
        },
    },
    updateCarForm: {
        before: {
            update: function (doc) {
                let colorId = AutoForm.getFieldValue('color', 'updateCarForm').colorId;
                let color = Colors.findOne(colorId);
                doc.$set["color.colorName"] = color.colorName;
                doc.$set["color.colorCode"] = color.colorCode;
                console.log(colorId);
                return doc; //autoFrom magic commence
            }
        }
    }
});

Template.updateCarFormWrapper.events({
    // Modal
    'click .submit': function (e) {
        $('#updateCarFormWrapper').modal('hide');
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

Template.updateCarForm.helpers({
    currentCar: function () {
        let carId = Session.get('selectedCarId');

        // console.log(AutoForm.getFieldValue('plate', 'updateCarForm'));
        if (typeof carId !== "undefined") {
            let car = Cars.findOne(carId);
            return car;
        }
    }
});