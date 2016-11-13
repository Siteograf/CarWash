Template.usersList.helpers({
    users: function() {
        return Meteor.users.find();
    }
});

Meteor.subscribe('users');

Template.registerHelper('isUserInRole', function(userId, role) {
    return Roles.userIsInRole(userId, role);
});
