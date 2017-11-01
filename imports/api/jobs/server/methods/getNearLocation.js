import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Jobs } from '/imports/api/jobs/jobs.js';


Meteor.methods({
  findNearest:function(latitude, longitude, maxDist){
    Jobs.rawCollection().createIndex({location: '2dsphere'});
    const query = {
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
          $maxDistance: maxDist,
        },
      },
    };
    return Jobs.find(query, { limit: 20 }).fetch();
    return 'success';
  }
});