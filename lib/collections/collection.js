//noinspection JSAnnotator

Tasks = new Mongo.Collection('tasks');
Tasks.attachSchema(new SimpleSchema({
    taskName: {
        type: String,
        max: 50,
        autoform: {
            placeholder: "Task name",
            label: false
        },
    },

    carId: {
        type: String,
        autoform: {
            type: "select2",
            // class: 'select2',
            // type: "select2",
            options: function () {
                return Cars.find().map(function (p) {
                    return {
                        label: p.make + " " + p.model + " " + p.plate,
                        value: p._id
                    };
                });
            },
            label: false
        }
    },

    locationId: {
        type: String,
        max: 50,
        autoform: {
            // class: 'select2',
            type: "select2",
            // class: "form-control-lg",
            options: function () {
                return Locations.find().map(function (p) {
                    return {
                        label: p.locationName + " " + p.locationZip + " " + p.locationAddress,
                        value: p._id
                    };
                });
            },
            label: false
        }
    },

    startDate: {
        type: Date,
        autoform: {
            type: "bootstrap-datepicker",
            placeholder: 'Date',
        }
    },

    createdAt: {
        type: Date,
        optional: true,
        autoform: {
            omit: true,
        },
    },

    updatedAt: {
        type: Date,
        optional: true,
        autoform: {
            omit: true,
        },
    },

    ownerId: {
        type: String,
        optional: true,
        autoform: {
            omit: true,
        }
    },

    executorId: {
        type: String,
        // TEST
        autoValue: function () {
            return Meteor.userId();
        },
        autoform: {
            omit: true,
        }
    },

    executorTime: {
        type: String,
        optional: true,
        autoform: {
            afFieldInput: {
                type: "time",
                omit: true,
            }
        }
    },

    message: {
        type: String,
        optional: true,
        autoform: {
            afFieldInput: {
                type: "textarea"
            }
        }
    },


    /*    created: {
     type: Object,
     },
     'user.created': {
     type: String,
     autoValue: function () {
     console.log(Meteor.userId());
     return Meteor.userId();
     },
     autoform: {
     omit: true,
     }
     },
     'date.created': {
     type: String,
     autoValue: function () {
     console.log(Meteor.userId());
     return Meteor.userId();
     },
     autoform: {
     omit: true,
     }
     },*/


}));


Cars = new Mongo.Collection('cars');
Cars.attachSchema(new SimpleSchema({
    make: {
        type: String,
        max: 20,
        autoform: {
            placeholder: "Make",
            label: false
        },
    },
    model: {
        type: String,
        max: 20,
        autoform: {
            placeholder: "Model",
            label: false
        },
    },
    plate: {
        type: String,
        max: 20,
        // optional: true,
        autoform: {
            placeholder: "Plate",
            label: false
        },
    },

    color: {
        type: Object,
    },
    'color.colorId': {
        type: String,
        autoform: {
            afFormGroup: {
                'formgroup-class': ''
            },
            options: function () {
                return Colors.find().map(function (p) {
                    return {label: p.colorName, value: p._id};
                });
            },
            label: false
        }
    },
    'color.colorName': {
        type: String,
        autoform: {
            omit: true,
        },
    },
    'color.colorCode': {
        type: String,
        autoform: {
            omit: true,
        },
    },

    odometer: {
        type: Number,
        label: "Odometer",
        min: 0,
        optional: true,
    },

    createdAt: {
        type: Date,
        autoValue: function () {
            return new Date();
        },
        autoform: {
            omit: true,
        },
    },

}));


Colors = new Mongo.Collection('colors');
Colors.attachSchema(new SimpleSchema({
    colorName: {
        type: String,
        label: "Color Name",
        max: 20,
    },
    colorCode: {
        type: String,
        optional: true,
        label: "Color Code",
        autoform: {
            afFieldInput: {
                type: "color"
            }
        }
    },
}));


Locations = new Mongo.Collection('locations');