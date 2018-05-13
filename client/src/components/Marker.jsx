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

  componentDidUpdate(){
    console.log("in componentDidUpdate marker");
  }

  componentDidMount(){
    console.log("in componentDidMount marker");
  }

  componentWillMount(){
    console.log("in componentWillMount marker");
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
    return (<Marker position={{lat: parseFloat(this.props.data.lat),
                        lng: parseFloat(this.props.data.lng)}}
              onClick={this.handleToggle}
              icon={this.props.icon}
      >
      {this.state.isOpen && <InfoWindows info={this.props.data} open={this.state.isOpen} onClose={this.handleToggle}/>}
      </Marker>
    );
  }
}

export default Markers;