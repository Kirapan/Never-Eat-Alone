import React from 'react';
import { Modal, FormGroup, ControlLabel, FormControl, Button, Row, Col } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import Resource from '../models/resource';
import Restaurant from './Restaurant';
import TimePicker from 'react-bootstrap-time-picker';

const userData = Resource('users')

class Messagebox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: (this.props.match.params.id || null),
      toId: (this.props.match.params.to_id || null),
      show: false,
      redirect: "",
      content: "",
      restaurant: '',
      time: 0
    }
  }

  componentWillMount() {
    this.setState({ show: true })
  }

  _hide = () => {
    this.setState({ show: false, redirect: `/api/users/${this.state.userId}/messages` })
  }

  _handleSubmit = (e) => {
    userData.sendMessages(this.state.userId, this.state.toId, this.state.content)
      .then(() => {
        console.log("ok")
      })
      .catch((errors) => this.setState({ errors: errors }))
      this._hide();
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
                  <FormControl componentClass="textarea" placeholder="Say something..." onChange={this._handleChange.bind(this)} />
                  <div class="input-group">
                  <span class="input-group-addon" id="sizing-addon2">Suggested restaurant: </span>
                  <input type="text" class="form-control" aria-describedby="sizing-addon2"
                  onChange={this._udpateRestaurant.bind(this)} value={this.state.restaurant}
                  placeholder="Pick from map or type..." />
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
