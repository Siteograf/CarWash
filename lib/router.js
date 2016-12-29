Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound'
});

Router.onBeforeAction(function () {
    if  (!Meteor.userId() && !Meteor.loggingIn()) {
        this.redirect('login');
        this.stop();
    } else {
        this.next();
    }
},{except: ['login'] });

Router.route('/', {
    name: 'homeIndex',
    data: function () {
        return{
            message: 'Wash start'
        }
    }
});

Router.route('/cars/:_id', {
    name: 'carPage',
    data: function() { return Cars.findOne(this.params._id); }
});



Router.map(function() {

    this.route('carList', {path: '/cars'});
    this.route('locationList', {path: '/locations'});
    this.route('taskList', {path: '/tasks'});
    this.route('colorList', {path: '/colors'});

    this.route('usersList', {path: '/users'});
    this.route('userShow', {
        path: '/user/:_id',
        data: function() { return Meteor.users.findOne(this.params._id); }
    });
});