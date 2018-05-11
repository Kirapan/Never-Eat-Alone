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

  componentWillMount(){
    //console.log("in marker", this.props.data.location);
  }
  handleToggle = () => {
    if (this.state.isOpen){
      this.setState({
        isOpen: false
      });
    } else {
      this.setState({
        isOpen: true
      });
    }
  }

  render() {
    return (<Marker position={{lat: parseFloat(this.props.data.location.lat),
                        lng: parseFloat(this.props.data.location.lng)}}
              onClick={this.handleToggle}
      >
      {this.state.isOpen && <InfoWindows info={this.props.data.info} open={this.state.isOpen} onClose={this.handleToggle}/>}
      </Marker>
    );
  }
}

export default Markers;