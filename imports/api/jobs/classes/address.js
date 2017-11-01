import { Meteor } from 'meteor/meteor';
import { Class } from 'meteor/jagi:astronomy';

export const Address = Class.create({
  name: 'Address',
  /* No collection attribute */
  fields: { //ONLY ACCOUNTING FOR JOBS IN THE UNITED STATES FOR NOW
    city: {
      type: String,
      default: "undefined",
      validators: [{
        type: 'minLength',
        param: 2 //Name of shortest city in the US is 2 letters
      }]
    },

    state: {
      type: String,
      default: "undefined",
      validators: [{
        type: 'minLength',
        param: 2 //State abbreviation at least 2 letters
      }]
    },

    zip: {
      type: String,
      default: "undefined"
    },

    streetAddress: {
      type: String,
      default: "undefined"
    },

    formattedAddress: {
      type: String,
      default: "undefined"
    }
  }
});
