import React, {Component} from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import GoogleMapsPage from '/imports/ui/component/GoogleMap.jsx';
import {WithContext as ReactTags} from 'react-tag-input';

// import GoogleMap2 from '/imports/ui/component/GoogleMap2.jsx';

import location from '@derhuerst/browser-location';

var posList = [];
Meteor.call("getPositions", function(err, result) {
  if(result){
    console.log("result", result);
    posList = result;
  }else{
    console.log("error", err);
  }
})

export default class SearchPage extends Component{
  constructor(props) {
    super(props)
    // const position_list = [];
    // Meteor.call("getPositions", function(err, result) {
    //   if(result){
    //     position_list = result;
    //   }else{
    //     console.log("error", err);
    //   }
    // })

    this.state = {
      address: '',
      loading:true,
      lat: 34.0576,
      lng: -117.8207,
      returnedLocations:[],
      pos_tags: [],
      pos_suggestions: ["Engineer", "Spaghetti", "Heheman", "Jeff", "Utah"]
      // pos_suggestions: posList

    }

    this.positionHandleDelete = this.positionHandleDelete.bind(this);
    this.positionHandleAddition = this.positionHandleAddition.bind(this);
    this.positionHandleFilterSuggestions = this.positionHandleFilterSuggestions.bind(this);

    this.setLocation = this.setLocation.bind(this);
    this.findNearJobLocations = this.findNearJobLocations.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.clearInput = this.clearInput.bind(this);

    this.onChange = (address) => this.setState({ address })

  }

  positionHandleDelete(i) {
    this.setState({
      pos_tags: this.state.pos_tags.filter((tag, index) => index !== i),
    });
  }


  positionHandleAddition(tag) {
    let { pos_tags } = this.state;
    this.setState({ pos_tags: [...pos_tags, {
      id: (pos_tags.length == 0) ? 1 : pos_tags[pos_tags.length-1].id + 1, text: tag }],
      pos_suggestions: this.state.pos_suggestions.filter(function(suggestion) {
        return !(suggestion.toLowerCase() === tag.toLowerCase())
      })
    })
  }

  positionHandleFilterSuggestions(textInputValue, possibleSuggestionsArray){
    console.log(possibleSuggestionsArray, "AYYYYY");
    var lowerCaseQuery = textInputValue.toLowerCase();
    return possibleSuggestionsArray.filter( function(suggestion) {
      return suggestion.toLowerCase().includes(lowerCaseQuery)
    })
  }

   componentWillMount(){
    //  Set initial location as the user's current location
     location((err, loc) => {
         if (err){
           this.setState({loading:false});
         }
         else {
           this.setState({lat:loc.latitude, lng:loc.longitude, loading: false})
         }
     })
   }

  setLocation(latLng){
    this.setState({lat:latLng.lat, lng:latLng.lng});
    this.findNearJobLocations();
  }

  findNearJobLocations(){
    let self = this;

    let maxDist = this.refs.proximity.value;
    maxDist *= 1000;
    Meteor.call("findNearest", this.state.lat, this.state.lng, maxDist, function(error, result){
      if(result){
        console.log('output from results');
        self.setState({returnedLocations: result});
      }
      if(error){
            console.log("error from finding nearest");
      }
    });
  }

  handleFormSubmit = (event) => {
    event.preventDefault()
    let data = {
      // position: this.position.value,
      city: this.refs.city.value
    }

    geocodeByAddress(data.city)
      .then(results => getLatLng(results[0]))
      .then(latLng => this.setLocation(latLng))
      .catch(error => console.error('Error', error))
    this.clearInput();
  }


  clearInput = () => {
    this.refs.city.value = "";
  }

  render(){
    const {pos_tags, pos_suggestions} = this.state;
    console.log("state", this.state);

    const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
    }

    console.log('returned locations', this.state.returnedLocations);

    return(
      <div id = "searchDiv">
        <div><a>'null'</a></div>
      <div className="center-block text-center" style={{marginTop:"2%"}}>
        <div className="searchform cf">
          {/* <input ref={(position) => {this.position = position}} type="text" placeholder="position?"/> */}
          <ReactTags
            id="positions"
            tags={pos_tags}
            suggestions={pos_suggestions}
            placeholder="Enter positions you're interested in."
            handleDelete={this.positionHandleDelete}
            autocomplete={true}
            handleAddition={this.positionHandleAddition}
            handleFilterSuggestions={this.positionHandleFilterSuggestions}
          />
          <input ref="city" type="text" placeholder="city?" value = "cal poly pomona"/>
          <input ref="proximity" type="text" placeholder="miles?" value="10" />
          <button onClick={this.handleFormSubmit} id="search" >Search</button>
        </div>
        {this.state.loading ? null : <GoogleMapsPage
          locations = {this.state.returnedLocations}
          lat={this.state.lat}
          lng={this.state.lng}
          jobs={this.state.returnedLocations}/>}
      </div>
      </div>
    )
  }
}
