import React from 'react';
import { Modal, FormGroup, ControlLabel, FormControl, Button, Row, Col } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import Resource from '../models/resource';
import Restaurant from './Restaurant';
import TimePicker from 'react-bootstrap-time-picker';
import DatePicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

const userData = Resource('users')

class Messagebox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: (this.props.match.params.id || null),
      toId: (this.props.match.params.to_id || null),
      show: false,
      redirect: '',
      content: '',
      restaurant: '',
      time: 0,
      date: ''
    }
  }

  componentWillMount() {
    this.setState({ show: true })
  }

  _hide = () => {
    this.setState({ show: false, redirect: `/api/users/${this.state.userId}/messages` })
  }

  _handleSubmit = (e) => {
    console.log("message", e.target.value);
    const state = this.state;
    let message = ''
    let time = '';

    if (!this.state.content){
      alert('Please fill in a message');
    } else if (!this.state.restaurant && !this.state.date && !this.state.time) {
      time = '10:00';
      message = this.state.content + " Date: " + this._getToday() + " Time: " + time;
    } else if (!this.state.date && !this.state.time) {
      time = '10:00';
      message = this.state.content + " At: " + this.state.restaurant + " Date: " + this._getToday() + " Time: " + time;
    } else if (!this.state.time) {
      time = '10:00';
      message = this.state.content + " At: " + this.state.restaurant + " Date: " + this.state.date.toString().substr(0,15) + " Time: " + time;
    } else {
      message = this.state.content + " At: " + this.state.restaurant + " Date: " + this.state.date.toString().substr(0,15) + " Time: " + this.convertSeconds(this.state.time);
    }

    this.setState(...state, {content: message} , () => {
      userData.sendMessages(this.state.userId, this.state.toId, this.state.content)
        .then(() => {
          console.log("ok")
        })
        .catch((errors) => this.setState({ errors: errors }))
        this._hide();
    });
  }

  convertSeconds(seconds) {
    let days     = Math.floor(seconds / (24*60*60));
        seconds -= days    * (24*60*60);
    let hours    = Math.floor(seconds / (60*60));
        seconds -= hours   * (60*60);
    let minutes  = Math.floor(seconds / (60));
        seconds -= minutes * (60);

    if (minutes === 0)
    {minutes = '00'};
    let hoursAndMinutes = hours + ":" + minutes;
    return hoursAndMinutes;
  }

  _handleChange = (e) => {
    this.setState({ content: e.target.value })
  }

  _restaurantChosen(restaurant){
    const state = this.state;
    this.setState(...state, {restaurant: restaurant.name,
                             restaurantObject: restaurant});
  }

  _udpateRestaurant(event) {
    event.preventDefault();
    const state = this.state;
    this.setState(...state, {restaurant: event.target.value});
  }

  _handleTimeChange(time) {
    const state = this.state;
    this.setState(...state, {time: time});
  }

  _handleDateChange = (newDate) => {
    this.setState({date: newDate});
  }

  _getToday() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1; //January is 0!
    let yyyy = today.getFullYear();

    if(dd<10) {
        dd = '0'+dd
    }

    if(mm<10) {
        mm = '0'+mm
    }

    today = mm + '/' + dd + '/' + yyyy;
    return today;
  }

  render() {
    if (this.state.redirect) return <Redirect to={this.state.redirect} />
    const messages_to_id = this.props.messages.filter(mess => mess.from_user_id == this.state.toId)
    const name = messages_to_id[0].name
    return (<div>
        {this.state.toId &&
          <Modal show={this.state.show} bsSize="large"
            onHide={this._hide} style={{zIndex: 1200}}>
            <Row>
            <Col xs={12} md={6} className='usersWithMapsCol'>
            <Modal.Header closeButton>
              <Modal.Title>Reply to {name}</Modal.Title>
            </Modal.Header>
              <Modal.Body>
                <FormGroup controlId="formControlsTextarea">
                  <ControlLabel>Message:</ControlLabel>
                  <FormControl componentClass="textarea" placeholder="Write your message..." onChange={this._handleChange.bind(this)} />
                  <div class="input-group">
                  <span class="input-group-addon" id="sizing-addon2">Suggested restaurant: </span>
                  <input type="text" class="form-control" id='restaurantChoice' aria-describedby="sizing-addon2"
                  onChange={this._udpateRestaurant.bind(this)} value={this.state.restaurant}
                  placeholder="Pick from map or type..." />
                  </div>
                  <div class="input-group">
                    <span class="input-group-addon" id="sizing-addon2">Suggested date: </span>
                    <DatePicker onDayClick={this._handleDateChange.bind(this)} todayButton={"Today"}/>
                  </div>
                  <div class="input-group">
                    <span class="input-group-addon" id="sizing-addon2">Suggested time: </span>
                    <TimePicker start="10:00" end="15:00" step={30}
                      onChange={this._handleTimeChange.bind(this)} value={this.state.time} />
                  </div>
                </FormGroup>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this._handleSubmit.bind(this)}>Send</Button>
              </Modal.Footer>
              </Col>
              <Col xs={12} md={6} className='usersWithMapsCol'>
                <Restaurant restaurantChosen={this._restaurantChosen.bind(this)}/>
              </Col>
          </Row>
          </Modal>}
      </div>
    )
  }
}

export default Messagebox
