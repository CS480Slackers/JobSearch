import React, {Component} from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import GoogleMapsPage from '/imports/ui/component/GoogleMap.jsx';
// import GoogleMap2 from '/imports/ui/component/GoogleMap2.jsx';

import location from '@derhuerst/browser-location';
export default class SearchPage extends Component{
  constructor(props) {
    super(props)
    this.state = {
      address: '',
      loading:true,
      lat: 34.0576,
      lng: -117.8207,
      returnedLocations:[]
    }

    this.setLocation = this.setLocation.bind(this);
    this.findNearJobLocations = this.findNearJobLocations.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.clearInput = this.clearInput.bind(this);

    this.onChange = (address) => this.setState({ address })

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
        self.setState({returnedLocations: result});
      }
    });
  }

  handleFormSubmit = (event) => {
    event.preventDefault()
    let data = {
      positon: this.refs.position.value,
      city: this.refs.city.value
    }

    geocodeByAddress(data.city)
      .then(results => getLatLng(results[0]))
      .then(latLng => this.setLocation(latLng))
      .catch(error => console.error('Error', error))
    this.clearInput();
  }


  clearInput = () => {
    this.refs.position.value = "";
    this.refs.city.value = "";
  }

  render(){
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
    }


    console.log('returned locations', this.state.returnedLocations);
    return(
      <div className="center-block text-center" style={{marginTop:"20%"}}>
        <div className="searchform cf">
          <input ref="position" type="text" placeholder="position?"/>
          <input ref="city" type="text" placeholder="city?" />
          <input ref="proximity" type="text" placeholder="miles?" />
          <button onClick={this.handleFormSubmit} id="search" >Search</button>
        </div>
        {this.state.loading ? null : <GoogleMapsPage
          locations = {this.state.returnedLocations}
          lat={this.state.lat}
          lng={this.state.lng}
          jobs={this.state.returnedLocations}/>}
      </div>
    )
  }
}
