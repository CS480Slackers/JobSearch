import React, {Component} from 'react';
import { Link, browserHistory } from 'react-router';
import { Class } from 'meteor/jagi:astronomy';
import { Job } from '/imports/api/jobs/classes/job.js';
import { Address } from '/imports/api/jobs/classes/address.js';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import {Map, InfoWindow, GoogleApiWrapper} from 'google-maps-react';
import {WithContext as ReactTags} from 'react-tag-input'
import {Majors} from '/imports/api/jobs/major_list.js';


class JobPostPage extends Component{
  constructor(props){
    super(props);

    this.state = {
      tags: [],
      suggestions: Majors
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.handleFilterSuggestions = this.handleFilterSuggestions.bind(this);
  }

  handleDelete(i) {
    this.setState({
      tags: this.state.tags.filter((tag, index) => index !== i),
    });
  }

  handleAddition(tag) {
    let { tags } = this.state;
    this.setState({ tags: [...tags, {
      id: (tags.length == 0) ? 1 : tags[tags.length-1].id + 1, text: tag }] });
  }

  handleFilterSuggestions(textInputValue, possibleSuggestionsArray){
    var lowerCaseQuery = textInputValue.toLowerCase();
    return possibleSuggestionsArray.filter( function(suggestion) {
      return suggestion.toLowerCase().includes(lowerCaseQuery)
    })
  }

  //returns majors, an array of strings (majors)
  getMajors = () => {
    var majors = [];
    this.state.tags.forEach(function(tag){
      majors.push(tag.text);
    });
    console.log(majors, "Majors: ");
    return majors;
  }

  submitJob = () => {
    var job = new Job();
    var address = new Address();

    //assign address fields
    address.city = this.city_ref.value;
    address.zip = this.zip_ref.value;
    address.state = this.state_ref.value;
    address.streetAddress = this.addr.value;
    address.formattedAddress = address.streetAddress + ", " + address.city + ", "
                                + address.state + ", " + address.zip + ", USA";

    //assign job fields
    job.location2 = address;
    job.company = this.name.value;
    job.latitiude = this.latitiude.value;
    job.longitude = this.longitude.value;
    job.position = this.position.value;
    job.description = this.jobDescription.value;
    if(this.state.tags.length != 0){ //majors left blank will be set to default value in job.js
      job.majors = this.getMajors();
    }

    /*
    get the latitude/longitude pair of the address to be used by google markers
    */
    geocodeByAddress(address.formattedAddress)
      .then(results => getLatLng(results[0]))
      .then(latLng => Meteor.call("jobInsert", job, latLng, function(error,result){
        if(result){
          let jobId = result;
          console.log("Job ID", jobId);
          browserHistory.push("/submission/"+jobId);
        }else {
          console.log("failed insert");
        }
      }))
      .catch(error => console.error(error))
  }

  render(){
    const { tags, suggestions } = this.state;
    console.log(tags, "Tags:");
    return(

      <div id="postdiv">
        <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo&libraries=places"></script>
        <div id = "PostHeader">Post a Job</div>

        <div id="form" className="topBefore">
            <input ref={(name) => { this.name = name }} id="name" type="text" placeholder="COMPANY NAME"/>
            <input ref={(position) => {this.position = position}} id="position" type="text" placeholder="POSITION"/>
            {/*}<input ref={(location) => {this.location = location}} id="location" type="text" placeholder="LOCATION"/>}*/}
            <ReactTags tags={tags}
                suggestions={suggestions}
                placeholder="Add Majors you're interested in hiring."
                handleDelete={this.handleDelete}
                handleAddition={this.handleAddition}
                handleFilterSuggestions={this.handleFilterSuggestions}
            />
            <input ref={(latitiude) => {this.latitiude = latitiude}} id="latitiude" type="number" placeholder="LATITUDE"/>
            <input ref={(longitude) => {this.longitude = longitude}} id="longitude" type="number" placeholder="LONGITUDE"/>
            <input ref={(addr) => {this.addr = addr}} id="address" type="text" placeholder="ADDRESS"/>

            <div>
              <input ref={(city_ref) => {this.city_ref = city_ref}} id="city" type="text" placeholder="CITY"/>
              <input ref={(state_ref) => {this.state_ref = state_ref}} id="state" type="text" placeholder="STATE"/>
              <input ref={(zip_ref) => {this.zip_ref = zip_ref}} id="zip" type="text" placeholder="ZIP"/>
            </div>

            <textarea ref={(jobDescription) => {this.jobDescription = jobDescription}} id="description" type="text" placeholder="DESCRIPTION">
            </textarea>
            <button onClick={this.submitJob} id="submit" type="submit">SUBMIT NOW</button>
        </div>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo"
})(JobPostPage)
