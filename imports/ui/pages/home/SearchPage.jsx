import React, {Component} from 'react';


export default class SearchPage extends Component{
  render(){
    // let returnedJobs = this.props.jobs;
    if(this.props.loading){
      return(<div>loading</div>)
    }
    else{
      // let {jobs} = this.props
      // let names = jobs.map(function(job,i){
      //   return <h2 key={i} >{job.name}</h2>
      // })
      return(
        <div>
          <h1> Search Page</h1>
          {/* {names} */}
        </div>)
    }
  }
}
