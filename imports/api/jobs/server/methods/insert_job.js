
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Jobs } from '/imports/api/jobs/jobs.js'
Meteor.methods({
  jobInsert:function(job){
    let tempId=Jobs.insert(job);
    console.log('id', tempId);
    return tempId;
  }
});
