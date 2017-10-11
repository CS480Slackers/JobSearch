import React, {Component} from 'react';


export default class SearchPage extends Component{

  submit = () => {
    let data = {
      positon: this.refs.position.value,
      city: this.refs.city.value
    }
    this.clearInput();
    console.log("search data", data);
  }

  clearInput = () => {
    this.refs.position.value = "";
    this.refs.city.value = "";
  }
  render(){
    return(
      <div className="center-block text-center" style={{marginTop:"20%"}}>
        <div className="searchform cf">
          <input ref="position" type="text" placeholder="position?" />
          <input ref="city" type="text" placeholder="city?" />
          <button onClick={this.submit} id="search" >Search</button>
        </div>
      </div>
    )
  }
}
