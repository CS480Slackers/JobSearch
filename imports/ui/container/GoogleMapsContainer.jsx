import React, {Component} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class GoogleMapsContainer extends Component {
render() {
    return (
      <Map
        google={this.props.google} zoom={14}
        initialCenter={{
          lat: 34.0576,
          lng: -117.8207
        }}
        zoom={15}
        >
        <Marker
          title={'The Japanese Garden.'}
          name={'Japanese Garden'}
          position= {{lat:34.0599, lng:-117.8204}} />

      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo"
})(GoogleMapsContainer)
