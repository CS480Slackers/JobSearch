import React, {Component} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class GoogleMapsPage extends Component {
  constructor(props) {
  super(props);
  this.state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  }
}
render() {
    let {lat, lng} = this.props;
    const style = {
      width: '90%',
      height: '70%',
      marginLeft:'50px',
      marginRight:'50px',
      marginTop:'50px',
      border:'solid 2px #fff',
      borderRadius:'3%',
    }
    console.warn("Here are the stupid props: ", this.props);
    console.warn("States", this.state);
    return (
      <Map
        google={this.props.google} zoom={14}
        center={{lat:lat, lng:lng}}
        zoom={15}
        style={style}
        >
        <Marker
          // title={'The Japanese Garden.'}
          // name={'Japanese Garden'}
          position= {{lat:lat, lng:lng}} />
          <InfoWindow onClose={this.onInfoWindowClose}>
        <div>
          <h1>{this.props.name}</h1>
        </div>
        </InfoWindow>
      </Map>

    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo"
})(GoogleMapsPage)
