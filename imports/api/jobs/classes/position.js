
import { Class } from 'meteor/jagi:astronomy';
import { Positions } from '/imports/api/jobs/positions.js';

//can use ENUMs or Status (automatic validation) from astronomy to set status of the job
export const Position = Class.create({
  name: 'Position',
  collection: Positions,

  fields: {
    text: {
      type: String,
      validators: [{
        type: 'minLength',
        param: 2 //minLength of a position is two characters
      }]
    }
  }
});
