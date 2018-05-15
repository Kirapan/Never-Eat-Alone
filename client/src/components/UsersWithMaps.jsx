import React, { Component } from 'react';
import { Grid, Row, Col, Alert, DropdownButton, MenuItem, ButtonToolbar, Thumbnail, Button } from 'react-bootstrap'
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom'
import Resource from '../models/resource'
import Users from './Users';
import Messagebox2 from './Messagebox2';
import Map from './Map';

const userData = Resource('users')

class UsersWithMaps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: [],
      backup: [],
      user_offers: [],
      industries: [],
      offers_needs: [],
      favorites:[],
      scrollData: [],
      filter: {
        industry: "",
        offer: ""
      },
      loadMore: true,
      isOpen: false,
      content: '',
      to_user: '',
      liked: false,
      personClicked: ''
    }
  }

  componentWillMount() {
    userData.findAll()
      .then((result) => {
        this.setState({
          lists: result,
          backup: result,
          errors: null,
        })
      })
      .then(() => {
        this.initData();
      })
      .catch((errors) => this.setState({ errors: errors }))

    userData.findIdustries()
      .then((result) => {
        this.setState({ industries: result })
      })
      .catch((errors) => this.setState({ errors: errors }))

    userData.findOffersNeeds()
      .then((result) => {
        this.setState({ offers_needs: result })
      })
      .catch((errors) => this.setState({ errors: errors }))

    userData.findFavorites(this.props.id)
      .then((result) => {
        this.setState({ favorites: result })
      })
      .catch((errors) => this.setState({ errors: errors }))
  }

  _onClick(personClicked){
    const state = this.state;
    this.setState(...state, {personClicked: personClicked})
    console.log("state ", this.state);
  }

  _currentSelection(selected){
    const state = this.state;
    this.setState(...state, {scrollData: selected})
  }

  render() {
//    if (!this.props.email) {
//      return (<Row className='usersWithMapsRow'>
//        <h2>Please<Link to='/api/signup'> Signup</Link> or<Link to='/api/login'> Login</Link> first!</h2>
//      </Row>)
//    } else {
    return (<Grid className='usersWithMapsGrid'>
      <Row className='usersWithMapsRow'>
        <Col xs={12} md={6} className='usersWithMapsCol'>
          <Users className='usersWithMapsElement' id={this.props.id} email={this.props.email}
            person={this._onClick.bind(this)} currentSelection={this._currentSelection.bind(this)}/>
        </Col>
        <Col xs={12} md={6} className='usersWithMapsCol'>
          <Map className='usersWithMapsElement' marker={this.state.scrollData} personClicked={this.state.personClicked} zoom={12}/>
        </Col>
      </Row>
      </Grid>
    )
  //}
  }
}

export default UsersWithMaps;