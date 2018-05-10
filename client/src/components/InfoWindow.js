import React, { Component, Button } from 'react';
import {
  GoogleMapLoader,
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

class InfoWindows extends Component {
  constructor(props){
    super(props);
    this.state = {
      isOpen: ''
    }
  }
  componentWillMount() {
    console.log("infor window mount", this.props.open);
    const state = this.state;
    this.setState(...state, {isOpen: this.props.open});
  }

  _onCloseclick(){
    console.log("in info window Toggle", this.state.isOpen);
    this.props.onClose();
  }

  render() {
    console.log("in infoWindows render", this.props);

    return (
      <InfoWindow onCloseClick={this._onCloseclick.bind(this)}>
        <div>
        <img src={this.props.info.img}/>
        <p>{this.props.info.name}</p>
        <p>{this.props.info.job}</p>
        <p>Looking for: {this.props.info.search}</p>
        <p>Offering: {this.props.info.offer}</p>
        </div>
      </InfoWindow>
    );
  }
}

export default InfoWindows;