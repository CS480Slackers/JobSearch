
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Position } from '/imports/api/jobs/classes/position.js';

Meteor.methods({ //adds position to the position collection
  //MAKE SURE WE DON'T ADD DUPLICATE POSITIONS
  positionInsert:function(pos){
    var list = Meteor.call("getPositions");
    var insert = true;

    for(var i = 0; i < list.length; i++){
      if(pos.toLowerCase() === list[i].toLowerCase()){
        insert = false;
        break;
      }
    }

    if(insert){
      var position = new Position();
      position.text = pos;
      var tempId = position.save();
      console.log('id', tempId + " for position -> " + position);
    }
  }
});
