
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Jobs } from '/imports/api/jobs/jobs.js'
Meteor.methods({
  jobRemove:function(id){
    Jobs.remove({'id': id});
    return 'success';
  }
});
