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
    // 'submit .new-car'(event){
    //     event.preventDefault();
    //     let target = event.target;
    //     Cars.insert({
    //         make: target.make.value,
    //         model: target.model.value,
    //         plate: target.plate.value,
    //         color: target.idColor.value,
    //         createdAt: new Date(),
    //     });
    //     console.log(target.idColor.value);
    //     target.make.value = '';
    //     target.model.value = '';
    //     target.plate.value = '';
    //     target.idColor.value = '';
    // },
    'click .editCar'(event){
        event.preventDefault();
        carId = event.target.getAttribute('car-id');

        // ModalHelper.openModalFor(animalId);
        Session.set('selectedCarId', carId);
        // Modal.show('animalsModal');
        $('#editCar').modal('show');
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

Template.carEditForm.events({
    // Modal
    'click .submit': function (e) {
        // e.preventDefault();
        // let currentCarId = Session.get('selectedCarId');
        // let colorIdSelect = document.querySelector('#editCar .idColor').value;
        // let colorObject = Colors.findOne(colorIdSelect);
        // let carProperties = {
        //     make: document.getElementById('make').value,
        //     model: document.getElementById('model').value,
        //     plate: document.getElementById('plate').value,
        //     color: {
        //         colorId: colorIdSelect,
        //         colorName: colorObject.colorName,
        //         colorCode: colorObject.colorCode,
        //     },
        // };
        // Cars.update(currentCarId, {$set: carProperties}, function (error) {
        //     if (error) {
        //         // display the error to the user
        //         alert(error.reason);
        //     } else {
        //         Router.go('carList', {_id: currentCarId});
        //     }
        // });

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

// Template.colorSelect.helpers({
//     colors() {
//         return Colors.find({});
//     },
// });
