import React, { Component } from 'react';
import {
  GoogleMapLoader,
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import InfoWindows from './InfoWindow'

class Markers extends Component {

  render() {
    console.log("in marker render");

    console.log("please", this.props.data);

    return (
      <Marker position={this.props.data.location}
      //onClick={props.onToggleOpen}
      >
      <InfoWindows/>
      </Marker>
    );
  }
}

export default Markers;