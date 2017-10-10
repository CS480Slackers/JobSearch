import React, {Component} from 'react';
import {
  withGoogleMap,
  GoogleMap,
  Marker,
  withScriptjs,
} from "react-google-maps";

export default class Homepage extends Component{
  render(){
    let c = (location) =>{
      console.log("click", location);
    }
    var l = { lat: 34.0822149, lng: -118.073879 };
    var g = { lat: 34.0822149, lng: -118.083879 };
    let rightClick = () => {
      console.log("rightclick");
    }

    let data = {
      name: "web dev",
      salary: 200
    }
    Meteor.call('jobInsert',data);
    const MapWithAMarker = withScriptjs(withGoogleMap(props =>
      <GoogleMap
        defaultZoom={13}
        defaultCenter={{ lat: 34.0822149, lng: -118.073879 }}
      >
        <Marker
          position={l}
          onClick={() => {c(l)}}
        />
        <Marker
          position={g}
          onClick={() => {c(g)}}
          onRightClick={rightClick}
        />
      </GoogleMap>
    ));
    return(
      <div>
        <h1>Home</h1>
        <MapWithAMarker
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }}></div>}
          containerElement={<div style={{ height: `400px` }}></div>}
          mapElement={<div style={{ height: `100%` }}></div>}
        />
      </div>)
  }
}
