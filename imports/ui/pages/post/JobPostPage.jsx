import React, {Component} from 'react';
import {Link, browserHistory} from 'react-router';
import { Class } from 'meteor/jagi:astronomy';
import { Job } from '/imports/api/jobs/classes/job.js';

export default class JobPostPage extends Component{
  submitJob = () => {
    var job = new Job();
    job.company = this.name.value;
    job.location = this.location.value;
    job.position = this.position.value;
    job.description = this.jobDescription.value;

    Meteor.call("jobInsert", job, function(error,result){
      if(result){
        let jobId = result;
        console.log("Job ID", jobId);
        browserHistory.push("/submission/"+jobId);
      }
    });

  }

  render(){
    return(
      <div id="postdiv">
        <div id = "PostHeader">Post a Job</div>
        <div id="form" className="topBefore">
            <input ref={(name) => { this.name = name }} id="name" type="text" placeholder="COMPANY NAME"/>
            <input ref={(location) => {this.location = location}} id="location" type="text" placeholder="LOCATION"/>
            <input ref={(position) => {this.position = position}} id="position" type="text" placeholder="POSITION"/>
            <textarea ref={(jobDescription) => {this.jobDescription = jobDescription}} id="description" type="text" placeholder="DESCRIPTION">
            </textarea>
            <button onClick={this.submitJob} id="submit" type="submit">SUBMIT NOW</button>
        </div>
      </div>

    )
  }
}
