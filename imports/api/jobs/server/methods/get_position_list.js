
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Position } from '/imports/api/jobs/classes/position.js';
import { Positions } from '/imports/api/jobs/positions.js';


//return an array of positions from our collection
Meteor.methods({
  getPositions:function(){
    var cursor = Positions.find(); //get a cursor
    var positions_arr = [];
    if( cursor != null ){
      cursor.forEach((position) => {
        positions_arr.push(position.text);
        console.log("Positions pushed: ", position.text);
      });
    }
    console.log("positions_arr = ", positions_arr);
    return positions_arr;
  }
});
