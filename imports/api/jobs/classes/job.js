
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Class } from 'meteor/jagi:astronomy';
import { Address } from '/imports/api/jobs/classes/address.js';
import { Jobs } from '/imports/api/jobs/jobs.js';

//can use ENUMs or Status (automatic validation) from astronomy to set status of the job
export const Job = Class.create({
  name: 'Job',
  collection: Jobs,

  fields: {
    company: {
      type: String,
      validators: [{
        type: 'minLength',
        param: 1 //company name cannot be empty
      }]
    },

    position: { //WE DO NOT NEED TO MAKE THIS A POSITION INSTANCE, USING A STRING IS FINE
      type: String,
      validators: [{
        type: 'minLength',
        param: 2 //"IT" is the shortest job position I can think of
      }]
    },

    //array of majors the employer would like to hire
    majors: {
      type: [String],
      default: function(){
        return ["all"]; //when querying by major, we will check if the first element
                        //of majors[] is "all"
      }
    },

    // latitiude: {
    //   type: String
    //   optional: true
    // },
    //
    // longitude: {
    //   type: String
    // },

    //location will store our GeoJSON object
    location: {
      type: Object,
      optional: true
    },

    //Eventually I want us to use location2 in place of location
    //Stores an address object that would be initialized based on user input
    location2: {
      type: Address,
    },

    description: {
      type: String,
      optional: true
    },

    /*If a job is NOT entered manually into our database (ex: inserted from results of another
     /website or from google) then we must check every so often that the job is still posted
     /and not, say, taken down or modified.
     /Set this flag to true if inserting job not posted on our site
    */
    checkUpdate: {
      type: Boolean,
      default: false
    },

    //incremented upon a user submitting application for this job, this field will NOT
    //be specified by the job poster
    numApplicants:{
      type: Number,
      default: 0
    },

    /*
     /This must be updated IMMEDIATELY after receiving the _id after job insertion
     /URL will be the job display on OUR website
     /Do not confuse with externalURL
    */
    url:{
      type:String,
    },
    //this will only be defined if job was posted on a different site, or if
    //specified by the poster
    externalURL:{
      type:String,
      optional:true
    },

    //TODO: post page should have a two options: full or part time with a check box next to each
    fullOrPart:{
      type:Boolean,
      optional:true,
    }
  }
});
