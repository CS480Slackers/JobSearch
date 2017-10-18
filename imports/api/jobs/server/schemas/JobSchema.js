
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

/*
 /Schema for jobs inserted into the database
 /MANDATORY KEYS: 'company', 'position',
*/
export const JobSchema = new SimpleSchema({
  company: {
    type: String,
    min:1 //cannot be blank
  },
  position: {
    type: String,
    min:2 //Can't think of a job position shorter than 2 letters. "IT" is shortest
  }
  location: {
    type: String,
    min:1 //cannot be blank
  }
  description:{
    type: String,
    optional:true,
  }
  /*If a job is NOT entered manually into our database (ex: inserted from results of another
   /website or from google) then we must check every so often that the job is still posted
   /and not, say, taken down or modified.
   /Set this flag to true if inserting job not posted on our site
  */
  checkUpdate:{
    type: Boolean,
    defaultValue: false,
  }
  //incremented upon a user submitting application for this job, this field will NOT
  //be specified by the job poster
  numApplicants:{
    type: Number,
    defaultValue:0,
  }
  //***
  //This must be updated IMMEDIATELY after receiving the _id after job insertion
  //URL will be the job display on OUR website
  //Do not confuse with externalURL
  //***
  jobURL:{
    type:String,
    optional:true
  }
  //this will only be defined if job was posted on a different site, or if specified by
  //the poster
  externalURL:{
    type:String,
    optional:true
  }
  //TODO: post page should have a two options: full or part time with a check box next to each
  fullOrPart:{
    type:Boolean,
    optional:true,
  }

});
