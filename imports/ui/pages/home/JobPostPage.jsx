import React, {Component} from 'react';
import {Link, browserHistory} from 'react-router';
export default class Homepage extends Component{
  render(){
    return(
      <div id="postdiv">
            <header id = "PostHeader">Post a Job</header>

            <form id="form" class="topBefore">
                <input id="name" type="text" placeholder="COMPANY NAME"/>
                <input id="location" type="text" placeholder="LOCATION"/>
                <input id="position" type="text" placeholder="POSITION"/>
                <textarea id="description" type="text" placeholder="DESCRIPTION">
                </textarea>
                <input id="submit" type="submit" value="SUBMIT NOW"/>
            </form>
      </div>

    )
  }
}
