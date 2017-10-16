import React, {Component} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class GoogleMapsPage extends Component {
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
        google={this.props.google} zoom={14}
        center={{lat:lat, lng:lng}}
        zoom={15}
        style={style}
        >
        <Marker
          // title={'The Japanese Garden.'}
          // name={'Japanese Garden'}
          position= {{lat:lat, lng:lng}} />
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo"
})(GoogleMapsPage)
