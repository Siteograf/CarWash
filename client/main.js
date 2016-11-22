import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import 'bootstrap';



Template.registerHelper('formatDate', function(date) {
    return moment(date).format('MM.DD.YYYY');
});