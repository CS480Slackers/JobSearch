import React, {Component} from 'react';
import { Link, browserHistory } from 'react-router';
import { Class } from 'meteor/jagi:astronomy';
import { Job } from '/imports/api/jobs/classes/job.js';
import { Address } from '/imports/api/jobs/classes/address.js';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';


class JobPostPage extends Component{
  submitJob = () => {
    var job = new Job();
    var address = new Address();

    address.city = this.city_ref.value;
    address.zip = this.zip_ref.value;
    address.state = this.state_ref.value;
    address.streetAddress = this.addr.value;
    address.formattedAddress = address.streetAddress + ", " + address.city + ", "
                                + address.state + ", " + address.zip + ", USA";
    job.location2 = address;
    job.company = this.name.value;
    job.latitiude = this.latitiude.value;
    job.longitude = this.longitude.value;
    job.position = this.position.value;
    job.description = this.jobDescription.value;
    geocodeByAddress(address.streetAddress+" "+address.city+" "+address.state)
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
    return(
      <div id="postdiv">
        <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo&libraries=places"></script>
        <div id = "PostHeader">Post a Job</div>
        <div id="form" className="topBefore">
            <input ref={(name) => { this.name = name }} id="name" type="text" placeholder="COMPANY NAME"/>
            <input ref={(position) => {this.position = position}} id="position" type="text" placeholder="POSITION"/>
            {/*}<input ref={(location) => {this.location = location}} id="location" type="text" placeholder="LOCATION"/>}*/}
            <input ref={(latitiude) => {this.latitiude = latitiude}} id="latitiude" type="number" placeholder="LAT"/>
            <input ref={(longitude) => {this.longitude = longitude}} id="longitude" type="number" placeholder="LONG"/>
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
