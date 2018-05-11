import React, { Component } from 'react';
import { Redirect } from 'react-router'
import { Button } from 'react-bootstrap';
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
      isOpen: '',
      toUser: false,
      toMessage: false
    }
  }
  componentWillMount() {
    const state = this.state;
    this.setState(...state, {isOpen: this.props.open});
  }

  _onCloseclick(){
    this.props.onClose();
  }

  _onlick(){
    console.log("to user")
    const state = this.state;
    this.setState(...state, {toUser: true});
  }

  _sendMessage(){
    console.log("messages");
    const state = this.state;
    this.setState(...state, {toMessage: true});
  }

  render() {
    if (this.state.toUser === true) {
      return <Redirect to={'users/'+  this.props.info.id} />
    }

    if (this.state.toMessage === true) {
      return <Redirect to={'messages/'+  this.props.info.id} />
    }

    return (
      <InfoWindow onCloseClick={this._onCloseclick.bind(this)}>
        <div>
          <img src={this.props.info.image} onClick={this._onlick.bind(this)}/>
          <p>{this.props.info.name}</p>
          <p>Company: {this.props.info.company}</p>
          <Button onClick={this._sendMessage.bind(this)}>Send message</Button>
        </div>
      </InfoWindow>
    );
  }
}

export default InfoWindows;