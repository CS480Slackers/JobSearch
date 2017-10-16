import React, {Component} from 'react';
import {
  withGoogleMap,
  GoogleMap,
  Marker,
  withScriptjs,
} from "react-google-maps";

export default class GoogleMap2 extends Component{

  render(){
    let {lat, lng} = this.props;
    var g = { lat: lat, lng: lng };
    const MapWithAMarker = withScriptjs(withGoogleMap(props =>
      <GoogleMap
        defaultZoom={13}
        defaultCenter={g}
      >
        <Marker
          position={g}
          // onClick={() => {c(g)}}
          // onRightClick={rightClick}
        />
      </GoogleMap>
    ));
    return(
      <div>
        <MapWithAMarker
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }}></div>}
          containerElement={<div style={{ height: `400px` }}></div>}
          mapElement={<div style={{ height: `100%` }}></div>}
        />
      </div>)
  }
}
