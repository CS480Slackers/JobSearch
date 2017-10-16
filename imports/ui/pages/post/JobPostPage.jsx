import React, {Component} from 'react';
import {Link, browserHistory} from 'react-router';


export default class JobPostPage extends Component{
  submitJob = () => {
    let job = {
      companyName: this.name.value,
      location: this.location.value,
      position: this.position.value,
      jobDescription: this.jobDescription.value
    }
    Meteor.call("jobInsert", job);
    console.log("Job Posting", job);
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
