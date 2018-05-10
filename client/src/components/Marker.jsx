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
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false
    }
  }

  handleToggle = () => {
    console.log("toggle marker");
    if (this.state.isOpen){
      this.setState({
        isOpen: false
      });
    } else {
      this.setState({
        isOpen: true
      });
    }
    console.log("in handleToggle", this.state.isOpen);
  }

  render() {
    console.log("in marker render", this.state.isOpen);

    return (
      <Marker position={this.props.data.location}
              onClick={this.handleToggle}
      >
      {this.state.isOpen && <InfoWindows info={this.props.data.info} open={this.state.isOpen} onClose={this.handleToggle}/>}
      </Marker>
    );
  }
}

export default Markers;