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

  componentDidMount(){
    $(".ReactTags__suggestions").css({backgroundColor:"#ffffff"});
  }

  handleDelete(i) {
    this.setState({
      tags: this.state.tags.filter((tag, index) => index !== i),
    });
  }

  handleAddition(tag) {
    let { tags } = this.state;
    this.setState({ tags: [...tags, {
      id: (tags.length == 0) ? 1 : tags[tags.length-1].id + 1, text: tag }],
      suggestions: this.state.suggestions.filter(function(suggestion) {
        return !(suggestion.toLowerCase() === tag.toLowerCase())
      })
    })
  }

  handleFilterSuggestions(textInputValue, possibleSuggestionsArray){
    var lowerCaseQuery = textInputValue.toLowerCase();
    return possibleSuggestionsArray.filter( function(suggestion) {
      return suggestion.toLowerCase().includes(lowerCaseQuery)
    })
  }

  //returns majors, an array of strings (majors)
  getMajorsFromTags = () => {
    var majors = [];
    this.state.tags.forEach((tag) => {
      majors.push(tag.text);
    });
    console.log(majors, "Majors: ");
    return majors;
  }

  clearInput = () => {
    this.name.value = "";
    this.position.value = "";
    this.addr.value = "";
    this.city_ref.value = "";
    this.state_ref.value = "";
    this.zip_ref.value = "";
    this.jobDescription.value = "";
    this.url.value = "";
    let clearTags = [];
    this.setState({tags: clearTags})
  }

  submitJob = () => {
    var job = new Job();
    var address = new Address();
    let self = this;

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
    // job.latitiude = this.latitiude.value;
    // job.longitude = this.longitude.value;
    job.url = this.url.value;
    job.position = this.position.value;
    job.description = this.jobDescription.value;

    if(this.state.tags.length != 0){ //majors left blank will be set to default value in job.js
      job.majors = this.getMajorsFromTags();
    }

    /*
    get the latitude/longitude pair of the address to be used by google markers
    */
    geocodeByAddress(address.formattedAddress)
      .then(results => getLatLng(results[0]))
      .then(latLng => Meteor.call("jobInsert", job, latLng, function(error,result){
        if(result){
          let jobId = result;
          console.warn("Job ID", jobId);
          self.clearInput();
          return Bert.alert('Thank you for your review.', 'success',
                        'fixed-top', 'fa-thumbs-o-up');
        }else {

          return Bert.alert('Error. Please Try Again.', 'danger',
                        'fixed-top', 'fa-thumbs-o-down');
        }
      }))
      .catch(error => console.error(error))
  }

  returnHome = () => {
      console.log("back Pushed");
      browserHistory.push("/");
    }

  render(){
    const { tags, suggestions } = this.state;
    return(

      <div id="postdiv">
        <button className ="HomeButton" onClick = {this.returnHome}> BACK </button>
        <div className="post-form">
          <h1>Post a Job</h1>
          <div className="contentform">
        	<div id="sendmessage"> Your message has been sent successfully. Thank you. </div>
          <div className="leftcontact">
      			<div className="form-group">
      			  <p>Company <span>*</span></p>
      			  <span className="icon-case"><i className="fa fa-home"></i></span>
      				<input ref={(name) => { this.name = name }} type="text" name="name" id="name" data-rule="required" data-msg="Vérifiez votre saisie sur les champs : Le champ 'Société' doit être renseigné."/>
              <div className="validation"></div>
      			</div>

      			<div className="form-group">
      			  <p>Company Address <span>*</span></p>
      			  <span className="icon-case"><i className="fa fa-location-arrow"></i></span>
      				<input ref={(addr) => {this.addr = addr}} type="text" name="adresse" id="adresse" data-rule="required" data-msg="Vérifiez votre saisie sur les champs : Le champ 'Adresse' doit être renseigné."/>
              <div className="validation"></div>
      			</div>

            <div className="form-group">
      			  <p>State <span>*</span></p>
      			  <span className=" icon-case"><i className="fa fa-building-o"></i></span>
      				<input ref={(state_ref) => {this.state_ref = state_ref}} type="text" name="state" id="state" data-rule="required" data-msg="Vérifiez votre saisie sur les champs : Le champ 'Ville' doit être renseigné."/>
              <div className="validation"></div>
      			</div>

            <div className="form-group">
      			  <p>City <span>*</span></p>
      			  <span className=" icon-case"><i className="fa fa-building-o"></i></span>
      				<input ref={(city_ref) => {this.city_ref = city_ref}} type="text" name="ville" id="ville" data-rule="required" data-msg="Vérifiez votre saisie sur les champs : Le champ 'Ville' doit être renseigné."/>
              <div className="validation"></div>
      			</div>

      			<div className="form-group">
      			  <p>Postcode <span>*</span></p>
      			  <span className="icon-case"><i className="fa fa-map-marker"></i></span>
      				<input ref={(zip_ref) => {this.zip_ref = zip_ref}} type="text" name="postal" id="postal" data-rule="required" data-msg="Vérifiez votre saisie sur les champs : Le champ 'Code postal' doit être renseigné."/>
              <div className="validation"></div>
      			</div>
      	  </div>

        	<div className="rightcontact">
            <div className="form-group">
              <p>Position <span>*</span></p>
              <span className="icon-case"><i className="fa fa-info"></i></span>
              <input ref={(position) => {this.position = position}} type="text" name="position" id="position" data-rule="required" data-msg="Vérifiez votre saisie sur les champs : Le champ 'Fonction' doit être renseigné."/>
              <div className="validation"></div>
            </div>

      			<div className="form-group">
      			  <p>Website URL <span>*</span></p>
      			  <span className="icon-case"><i className="fa fa-info"></i></span>
              <input ref={(url) => {this.url = url}} type="text" name="url" id="url" data-rule="required" data-msg="Vérifiez votre saisie sur les champs : Le champ 'Fonction' doit être renseigné."/>
              <div className="validation"></div>
      			</div>

      			<div className="form-group">
      			  <p>Description <span>*</span></p>
      			  <span className="icon-case"><i className="fa fa-comments-o"></i></span>
              <textarea ref={(jobDescription) => {this.jobDescription = jobDescription}} name="Description" rows="14" data-rule="required" data-msg="Vérifiez votre saisie sur les champs : Le champ 'Message' doit être renseigné."></textarea>
              <div className="validation"></div>
      			</div>
        	</div>
    	  </div>
        <button onClick={this.submitJob} type="submit" id="submit" className="bouton-contact">Send</button>
      </div>
    </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo"
})(JobPostPage)
