
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Position } from '/imports/api/jobs/classes/position.js';

Meteor.methods({ //adds position to the position collection
  //MAKE SURE WE DON'T ADD DUPLICATE POSITIONS
  positionInsert:function(pos){
    var position = new Position();
    position.text = pos;
    var tempId = position.save();
    console.log('id', tempId + " for position -> " + position);
  }
});
