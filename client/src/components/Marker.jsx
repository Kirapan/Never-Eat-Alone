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
      isOpen: false,
      location: {
        lat: '',
        lng: ''
      }
    }
  }

  componentDidUpdate(){
    console.log("in componentDidUpdate marker");
  }

  componentDidMount(){
    console.log("in componentDidMount marker");
  }

  componentWillMount(){
    //location for restaurants
    if (this.props.location){
      this.setState({location: {lat: this.props.location.lat,
                                lng: this.props.location.lng}})
    } else{//location for people
      this.setState({location: {lat: this.props.data.lat,
                                lng: this.props.data.lng}})
    }
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

    return (<Marker position={{lat: parseFloat(this.state.location.lat),
                              lng: parseFloat(this.state.location.lng)}}
                    onClick={this.handleToggle}
                    icon={this.props.icon}
      >
      {this.state.isOpen && <InfoWindows info={this.props.data}
        open={this.state.isOpen} onClose={this.handleToggle} />}
      </Marker>
    );
  }
}

export default Markers;