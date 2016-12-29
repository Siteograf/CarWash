import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});

Accounts.onCreateUser(function(options, user) {
    user.voted = 0;
    //user.roles = ['client'];
    //Roles.userIsInRole(user._id, 'manage-team');
    //Roles.addUsersToRoles(user, ['player','goalie']);
    return user;
});

Accounts.onLogin(function(user) {
    var user = user.user;
    var defaultRole = ['client'];
    if (!user.roles){
        Roles.addUsersToRoles(user, defaultRole)
    };
})

Meteor.publish("users", function () {
    var fields = {'username': 1};

    if ( Roles.userIsInRole(this.userId, 'client') ) {
        fields.status = 1;
    }

    return Meteor.users.find({}, {fields: fields});
});

Meteor.publish("cars", function () {
    if (Roles.userIsInRole(this.userId, 'manager')) {
        return Cars.find();
    } else if (Roles.userIsInRole(this.userId, 'client')) {
        return Cars.find({
            userId: this.userId
        }, {
            fields: {
                userId: false
            }
        });
    }
});


Meteor.publish("locations", function () {
    return Locations.find();
});
Meteor.publish("tasks", function () {
    return Tasks.find();
});
Meteor.publish("colors", function () {
    return Colors.find();
});