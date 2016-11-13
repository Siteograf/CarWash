Template.locationList.helpers({
    locations() {
        return Locations.find({}, {sort: {createdAt: -1}});
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

Template.locationList.events({
    'submit .new-location'(event){
        event.preventDefault();

        let target = event.target;

        Locations.insert({
            locationName: target.locationName.value,
            locationZip: target.locationZip.value,
            locationAddress: target.locationAddress.value,
            locationComment: target.locationComment.value,
            createdAt: new Date(),
        });

        target.locationName.value = '';
    },
    'click .editLocation'(event){
        event.preventDefault();

        locationId = event.target.getAttribute('location-id');
        Session.set('selectedLocationId', locationId);
        $('#editLocation').modal('show');

    },
    'click .deleteLocation': function (event) {
        event.preventDefault();
        Locations.remove(this._id);
    },

    'change .hide-completed input'(event, instance) {
        instance.state.set('hideCompleted', event.target.checked)
    }
});

Template.locationEditForm.events({
    'click .submit': function (e) {
        e.preventDefault();

        let currentLocationId = Session.get('selectedLocationId');

        let locationProperties = {
            locationName: document.getElementById('locationName').value,
            locationZip: document.getElementById('locationZip').value,
            locationAddress: document.getElementById('locationAddress').value,
            locationComment: document.getElementById('locationComment').value,
        };

        Locations.update(currentLocationId, {$set: locationProperties}, function (error) {
            if (error) {
                // display the error to the user
                alert(error.reason);
            } else {
                Router.go('locationList', {_id: currentLocationId});
            }
        });

        $('#editLocation').modal('hide');
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

Template.locationEditForm.helpers({
    location: function () {
        var locationId = Session.get('selectedLocationId');

        if (typeof locationId !== "undefined") {
            var location = Locations.findOne(locationId);
            return location;
        } else {
            return {name: '', rank: ''}
        }
    }
});


