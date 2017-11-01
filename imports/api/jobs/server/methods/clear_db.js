import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Jobs } from '/imports/api/jobs/jobs.js'
Meteor.methods({
  clearDB:function(){
    Jobs.remove({});
    return 'success';
  }
});
