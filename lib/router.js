Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound'
});

Router.route('/', {
    name: 'homeIndex',
    data: function () {
        return{
            message: 'Wash start'
        }
    }
});

Router.route('/cars', {
    name: 'carList',
});

Router.route('/cars/:_id', {
    name: 'carPage',
    data: function() { return Cars.findOne(this.params._id); }
});

// Router.route('/cars/:_id/edit', {
//     name: 'carEditForm',
//     data: function() { return Cars.findOne(this.params._id); }
// });

Router.route('/locations', {
    name: 'locationList',
});

Router.route('/tasks', {
    name: 'taskList',
});

Router.route('/colors', {
    name: 'colorList',
});