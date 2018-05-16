import React from 'react';
import Resource from '../models/resource';
import { Grid, Row, Col, Button, Modal, FormGroup, ControlLabel, FormControl } from 'react-bootstrap'
import Restaurant from './Restaurant';
import TimePicker from 'react-bootstrap-time-picker';
import DatePicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

const userData = Resource('users')

class Favorites extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: (this.props.match.params.id || null),
      lists: [],
      favorites: [],
      liked: false,
      reply_id:"",
      reply_name:"",
      date: '',
      format: 'YYYY-MM-DD',
      inputFormat: 'DD/MM/YYYY',
      startDate: ''
    }
  }

  componentWillMount() {
    this._getInitialState;
    userData.findAll()
      .then((result) => {
        const state = this.state;
        this.setState(...state, { lists: result })
      })
      .catch((errors) => this.setState({ errors: errors }))

    userData.findFavorites(this.state.id)
      .then((result) => {
        console.log("i am the result of favorites", result)
        this.setState({ favorites: result })
      })
      .catch((errors) => this.setState({ errors: errors }))
  }

  _handleLike = (e) => {
    let id = e.target.getAttribute('data-key')
    id = parseInt(id)
    if (this.state.favorites.indexOf(id) < 0) {
      userData.addFavorites(this.props.id, id)
        .then((result) => {
          let fav_array = this.state.favorites
          fav_array.push(id)
          this.setState({ favorites: fav_array })
        })
        .catch((errors) => this.setState({ errors: errors }))
    } else {
      userData.deleteFavorites(this.props.id, id)
        .then((result) => {
          let index = this.state.favorites.indexOf(id)
          let fav_array = this.state.favorites
          fav_array.splice(index, 1)
          this.setState({ favorites: fav_array })
        })
        .catch((errors) => this.setState({ errors: errors }))
    }
  }

  toggleModal = (e) => {
    if (!this.state.isOpen) {
      let id = e.target.getAttribute('data-keyid')
      id = parseInt(id)
      let name = e.target.getAttribute('data-keyname')
      this.setState({
        isOpen: !this.state.isOpen,
        reply_id :id,
        reply_name: name,
        restaurant: '',
        date: '',
        time: ''
      });
    } else {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }
  }

  _handleSubmit = (e) => {
    const state = this.state;
    let message = ''
    let time = '';
    let date = '';

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

    if (this.state.date) {
      date = this.state.date.toString().substr(0,15);
    }

    //check if time has been set, otherwise default to 10:00
    if (!this.state.time){
      time = '10:00';
    } else {
      time = this.convertSeconds(this.state.time);
    }
    console.log("what is send ", message);
    //message = this.state.content + " At: " + this.state.restaurant + " Time: " + time;
    this.setState(...state, {content: message} , () => {
      userData.sendMessages(this.props.id, this.state.reply_id, this.state.content)
        .then(() => {
          console.log("ok")
        })
        .catch((errors) => this.setState({ errors: errors }))
        this.toggleModal()
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
    let to_user = e.target.getAttribute('data-key')
    to_user = parseInt(to_user)
    this.setState({ content: e.target.value, to_user: to_user })
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
    let newList = []
    this.state.lists.filter((list) => {
      if (this.state.favorites.includes(list.id)) {
        newList.push(list)
      }
    })

    const displayImage = newList.map((prof, idx) => {
      return (<Col xs={3} md={2} className='usersCol'>
        <div className='usersThumb' >
          <img class="img-circle usersImg" src={prof.image} alt='usersImg'/>
          <h5><strong>{prof.name}</strong></h5>
          <h6 className='usersIndustry'>{prof.industry}</h6>
          <h6>{prof.offers[0]}, {prof.offers[1]},{prof.offers[2]} </h6>
          <div className="usersButtons">
          {this.state.favorites.indexOf(prof.id) < 0 ?
            (<Button bsStyle="primary" data-key={prof.id} onClick={this._handleLike.bind(this)}>Like</Button>) :
            (<Button bsStyle="danger" data-key={prof.id} onClick={this._handleLike.bind(this)}>Liked</Button>)}
          <Button data-keyid={prof.id} data-keyname={prof.name} bsStyle="default" onClick={this.toggleModal.bind(this)}>Invite</Button>
          </div>
        </div>
      </Col >)
    })

//    if (!this.props.email) {
//      return (<Row className='usersWithMapsRow'>
//        <h2>Please<Link to='/api/signup'> Signup</Link> or<Link to='/api/login'> Login</Link> first!</h2>
//      </Row>)
//    } else {
      return (<Grid className='usersWithMapsRow'>
        <Row className='usersImageRow'>
          {displayImage}
        </Row>
        <Modal show={this.state.isOpen} bsSize="large"
            onHide={this.toggleModal.bind(this)} style={ {zIndex: 1200}}>
          <Row>
          <Col xs={12} md={6} className='usersWithMapsCol'>
          <Modal.Header closeButton>
            <Modal.Title>Reply to {this.state.reply_name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormGroup controlId="formControlsTextarea">
              <ControlLabel>Message:</ControlLabel>
              <FormControl componentClass="textarea" placeholder="Write your message..." onChange={this._handleChange.bind(this)} />
              <div class="input-group">
                <span class="input-group-addon" id="sizing-addon2">Suggested restaurant: </span>
                <input type="text" class="form-control" aria-describedby="sizing-addon2"
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
        </Modal>
      </Grid>)
    }
  //}
}

export default Favorites