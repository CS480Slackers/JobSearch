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
      lat:0,
      lng:0,
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
         if (err) console.error(err)
         else {
           this.setState({lat:loc.latitude, lng:loc.longitude, loading: false})
           console.log('state', this.state);
           console.log('loc', loc);
         }
     })
   }

  setLocation(latLng){
    this.setState({lat:latLng.lat, lng:latLng.lng});
    let self = this;
    this.findNearJobLocations();
  }

  findNearJobLocations(){
    Meteor.call("findNearest", this.state.lat, this.state.lng, 5000, function(error, result){
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

    return(
      <div className="center-block text-center" style={{marginTop:"20%"}}>
        <div className="searchform cf">
          <input ref="position" type="text" placeholder="position?"/>
          <input ref="city" type="text" placeholder="city?" />
          <button onClick={this.handleFormSubmit} id="search" >Search</button>
        </div>
        {this.state.loading ? null : <GoogleMapsPage lat={this.state.lat} lng={this.state.lng}/>}
      </div>
    )
  }
}
