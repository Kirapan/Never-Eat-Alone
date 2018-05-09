import React, { Component } from 'react';
//import GoogleMapReact, {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-map-react';
import SimpleMap from './SimpleMap'

class MapWithMarker extends Component {

  render() {
    console.log("in marker render");
    if (!this.props.loaded) {
      return <div>Loading...</div>
    }
    const location = {
      lat: 43.65,
      lng: -79.38
    }

    const marker = [
      {
        location: {
          lat: 43.65,
          lng: -79.38
        }
      },
      {
        location: {
          lat: 43.66,
          lng: -79.39
        }
      }
    ]

    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '500px', width: '500px' }}>
        This is the Maps part
        <SimpleMap center={location} markers={marker} google={this.props.google}/>
      </div>
    );
  }
}

//export default GoogleApiComponent({
//  apiKey: 'AIzaSyA8Mufeh6GACIkLqJlIXnjC0o3NEi0FaBY'
//})(MapWithMarker)
export default MapWithMarker;