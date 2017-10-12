import React, {Component} from 'react';
import {Link, browserHistory} from 'react-router';
export default class JobPostPage extends Component{
  render(){
    return(
      <div id="postdiv">
        <div id = "PostHeader">Post a Job sdfsadf</div>
        <div id="form" className="topBefore">
            <input id="name" type="text" placeholder="COMPANY NAME"/>
            <input id="location" type="text" placeholder="LOCATION"/>
            <input id="position" type="text" placeholder="POSITION"/>
            <textarea id="description" type="text" placeholder="DESCRIPTION">
            </textarea>
            <button id="submit" type="submit">SUBMIT NOW</button>
        </div>
      </div>

    )
  }
}
