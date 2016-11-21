//noinspection JSAnnotator


Tasks = new Mongo.Collection('tasks');

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
        optional: true,
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

Posts = new Mongo.Collection("posts");
Posts.attachSchema(new SimpleSchema({
    title: {
        type: String,
        label: "Title",
        max: 200
    },
    content: {
        type: String,
        label: "Content"
    },


}));



