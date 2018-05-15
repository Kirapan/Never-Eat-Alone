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
const faker = require('faker');

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
    let food = faker.image.food()
    console.log("in infoWindow ", food);
    const state = this.state;
    this.setState(...state, {isOpen: this.props.open});
  }

  _onCloseclick(){
    this.props.onClose();
  }

  _onlick(){
    const state = this.state;
    this.setState(...state, {toUser: true});
  }

  _sendMessage(){
    const state = this.state;
    this.setState(...state, {toMessage: true});
  }

  _navigate(){
    window.open(this.props.info.shortUrl);
  }

  render() {
    if (this.state.toUser === true) {
      return <Redirect to={'users/'+  this.props.info.id} />
    }

    if (this.state.toMessage === true) {
      return <Redirect to={'messages/'+  this.props.info.id} />
    }

    const content = this.props.info.image ? (//infoWindow for people
        <div>
          <img src={this.props.info.image}/>
          <p>{this.props.info.name}</p>
          <p>Company: {this.props.info.company}</p>
          <Button onClick={this._sendMessage.bind(this)}>Send message</Button>
        </div>
    ) : (//infoWindow for restaurants
        <div>
          <img src="https://picsum.photos/100/100/?random"/>
          <p>{this.props.info.name}</p>
          <p>{this.props.info.location.formattedAddress[0]} </p>
          <Button onClick={this._navigate.bind(this)}>Go to website</Button>
        </div>
    )

    return (<InfoWindow onCloseClick={this._onCloseclick.bind(this)}>
        {content}
      </InfoWindow>
    );
  }
}

export default InfoWindows;