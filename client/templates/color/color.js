Meteor.subscribe('colors');

Template.colorList.helpers({
    colors() {
        return Colors.find({}, {sort: {createdAt: -1}});
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

Template.colorList.events({
    // 'submit .new-color'(event){
    //     event.preventDefault();
    //
    //     let target = event.target;
    //
    //     Colors.insert({
    //         colorName: target.colorName.value,
    //         colorCode: target.colorCode.value,
    //         createdAt: new Date(),
    //     });
    //
    //     target.colorName.value = '';
    //     target.colorCode.value = '';
    // },
    'click .editColor'(event){
        event.preventDefault();

        colorId = event.target.getAttribute('color-id');
        Session.set('selectedColorId', colorId);

        $('#editColor').modal('show');

        let colorCode = event.target.getAttribute('color-code');

        // $('#colorPicker').colorpicker('destroy');
        // $('#colorPicker').colorpicker({
        //     color: colorCode,
        //     customClass: 'colorpicker-2x',
        //     sliders: {
        //         saturation: {
        //             maxLeft: 200,
        //             maxTop: 200
        //         },
        //         hue: {
        //             maxTop: 200
        //         },
        //         alpha: {
        //             maxTop: 200
        //         }
        //     }
        // });
    },
    'click .deleteColor': function (event) {
        event.preventDefault();
        Colors.remove(this._id);
    },

    'change .hide-completed input'(event, instance) {
        instance.state.set('hideCompleted', event.target.checked)
    }
});

Template.colorEditForm.events({
    'submit form': function (event) {
        event.preventDefault();
        let target = event.target;

        let currentColorId = this._id;

        let colorProperties = {
            colorName: target.colorName.value,
            colorCode: target.colorCode.value,
        };

        Colors.update(currentColorId, {$set: colorProperties}, function (error) {
            if (error) {
                // display the error to the user
                alert(error.reason);
            } else {
                Router.go('colors', {_id: currentColorId});
            }
        });
    },

    'click .submit': function (e) {
        e.preventDefault();

        // let currentColorId = Session.get('selectedColorId');
        //
        // let colorProperties = {
        //     colorName: document.getElementById('colorName').value,
        //     colorCode: document.getElementById('colorCode').value,
        // };
        //
        // Colors.update(currentColorId, {$set: colorProperties}, function (error) {
        //     if (error) {
        //         // display the error to the user
        //         alert(error.reason);
        //     } else {
        //         Router.go('colorList', {_id: currentColorId});
        //     }
        // });

        $('#editColor').modal('hide');
    },

    'click .delete': function (e) {
        e.preventDefault();

        if (confirm("Delete this post?")) {
            var currentPostId = this._id;
            Posts.remove(currentPostId);
            Router.go('postsList');
        }
    }
});

Template.colorEditForm.helpers({
    currentColor: function () {
        let colorId = Session.get('selectedColorId');

        if (typeof colorId !== "undefined") {
            let color = Colors.findOne(colorId);
            return color;
        }
    },

});

Template.newColorForm.onRendered(function () {
    $('.colorCode').colorpicker({
        customClass: 'colorpicker-2x',
        sliders: {
            saturation: {
                maxLeft: 200,
                maxTop: 200
            },
            hue: {
                maxTop: 200
            },
            alpha: {
                maxTop: 200
            }
        }
    });
});
