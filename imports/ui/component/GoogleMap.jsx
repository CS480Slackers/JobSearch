import React, {Component} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import {Link, browserHistory} from 'react-router';

export class GoogleMapsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    }
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClicked = this.onMapClicked.bind(this);
  }

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
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

  onBtnClicked = (e) =>{
    console.log("this button was clicked")
  }

render() {
    let {lat, lng, jobs} = this.props;
    const style = {
      width: '90%',
      height: '70%',
      marginLeft:'50px',
      marginRight:'50px',
      marginTop:'50px',
      border:'solid 2px #fff',
      borderRadius:'3%'
    }

    let self = this;
    let jobList = jobs.map(function(job, i){
      console.log('job ', job, "key ", i);
      return (
        <Marker
          title={job.company}
          onClick={self.onMarkerClick}
          name={job.company}
          jobPosition={job.position}
          position= {{lat:job.location.coordinates[1], lng:job.location.coordinates[0]}}
          url = {job.url}/>
      )
    })


    return (
      <Map
        clickableIcons={false}
        google={this.props.google}
        center={{lat:lat, lng:lng}}
        zoom={15}
        style={style}
        onClick= {this.onMapClicked}
        >
        {jobList}
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}>
            <div>
              <div style={{color: 'black'}}>
                <h3> <strong>{this.state.selectedPlace.name} </strong></h3>
                <h5>{this.state.selectedPlace.jobPosition}</h5>

              </div>
              <a style={{color: 'blue'}}  target="_blank" href={"http://" + this.state.selectedPlace.url}> {this.state.selectedPlace.url} </a>
            </div>
          </InfoWindow>
      </Map>

    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo"
})(GoogleMapsPage)
