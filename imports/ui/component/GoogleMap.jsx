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
    console.warn(this.props.locations);
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClicked = this.onMapClicked.bind(this);
  }

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
    console.warn(this.state);
    console.warn(this.state.selectedPlace.name);
  }

  onMapClicked = (props) => {
    console.warn("map clicked");
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
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
    return (
      <Map
        clickableIcons={false}
        google={this.props.google}
        center={{lat:lat, lng:lng}}
        zoom={15}
        style={style}
        onClick= {this.onMapClicked}
        >
        <Marker
          title={'Current Location'}
          onClick={this.onMarkerClick}
          name={'Current Location'}
          position= {{lat:lat, lng:lng}} />
          {/* <Marker
            title={'Japanese Garden'}
            onClick={this.onMarkerClick}
            name={'Japanese Garden'}
            jobName={"Landscape Engineer"}
            position= {{lat:34.0599, lng:-117.8204}} /> */}
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}>
              <div style={{color: 'black'}}>
                <h5>{this.state.selectedPlace.name}</h5>
                <h5>{this.state.selectedPlace.jobName}</h5>
              </div>
            </InfoWindow>
      </Map>

    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo"
})(GoogleMapsPage)
