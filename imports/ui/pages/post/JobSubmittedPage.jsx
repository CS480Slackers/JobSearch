import React, {Component} from 'react';
import {Link, browserHistory} from 'react-router';
//import {JobsContainer} from '/imports/ui/container/JobsContainer.jsx'

export default class JobSubmittedPage extends Component{
  render(){
    let jobId = this.props.params.jobId;
    return(
      <div id = "job-submitted">
        <div id = "job-submited-header">The following job has been posted with
          ID = {jobId}</div>
        <div className="job-title">
        </div>
      </div>
    )
  }
}
