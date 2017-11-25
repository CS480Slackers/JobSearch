
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Jobs } from '/imports/api/jobs/jobs.js';
import { Job } from '/imports/api/jobs/classes/job.js';

Meteor.methods({
  jobInsert:function(job, latLng){
    job.location = {
      type:"Point",
      coordinates:[latLng.lng, latLng.lat]
    }
    Meteor.call("positionInsert", job.position);

    var tempId = job.save();
    console.log('id', tempId);
    console.log("Job Posting", job);
    return tempId;
  }
});
