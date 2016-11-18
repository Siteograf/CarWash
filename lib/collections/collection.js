//noinspection JSAnnotator
Tasks = new Mongo.Collection('tasks');
Cars = new Mongo.Collection('cars');

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



