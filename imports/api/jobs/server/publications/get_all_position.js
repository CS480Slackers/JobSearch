import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Positions } from '/imports/api/jobs/positions.js';

Meteor.publish("all_position", function (){
  return Positions.find({});
});
