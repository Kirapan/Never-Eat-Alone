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

  initData = () => {
    let data = this.state.backup.slice(0, 20)
    this.setState({ scrollData: data })
  }

  loadMore = () => {
    let checkMore = this.state.backup.length
    let length = this.state.scrollData.length
    if (checkMore === length) {
      this.setState({ loadMore: false })
    } else {
      let data = this.state.backup.slice(length, 20 + length)
      let newData = this.state.scrollData.concat(data)
      this.setState({ scrollData: newData })
    }
  }

  _handleIndustrySelect = (e) => {
    let newFilter = this.state.filter
    newFilter.industry = e
    this.setState({ filter: newFilter })
    let newList = [];
    let off = this.state.filter.offer
    if (e && off) {
      newList = this.state.lists.filter(list => {
        return list.industry === e && (list.offers[0] === off || list.offers[1] === off || list.offers[2] === off)
      })
    } else if (e && !off) {
      newList = this.state.lists.filter(list =>
        list.industry === e)
    } else if (!e && off) {
      newList = this.state.lists.filter(list => {
        return (list.offers[0] === off || list.offers[1] === off || list.offers[2] === off)
      })
    } else {
      newList =this.state.lists
    }
    this.setState({
      backup: newList
    }, () => {
      let data = this.state.backup.slice(0, 20)
      this.setState({ scrollData: data })
    });
  }

  _handleOfferSelect = (e) => {
    let newFilter = this.state.filter
    newFilter.offer = e
    this.setState({ filter: newFilter })
    let newList = []
    let indu = this.state.filter.industry
    if (e && indu) {
      newList = this.state.lists.filter(list => {
        return list.industry === indu && (list.offers[0] === e || list.offers[1] === e || list.offers[2] === e)
      })
    } else if (e && !indu) {
      newList = this.state.lists.filter(list => {
        return (list.offers[0] === e || list.offers[1] === e || list.offers[2] === e)
      })
    } else if (!e && indu) {
      newList = this.state.lists.filter(list =>
        list.industry === indu)
    } else {
      newList = this.state.lists;
    }
    this.setState({
      backup: newList
    }, () => {
      let data = this.state.backup.slice(0, 20)
      this.setState({ scrollData: data })
    });
  }

_handleLike = (e) => {
    console.log("klike")
    let id = e.target.getAttribute('data-key')
    id = parseInt(id)
    if (this.state.favorites.indexOf(id) < 0) {
      userData.addFavorites(this.props.id, id)
        .then((result) => {
          console.log("i am in adddddddd")
          let fav_array = this.state.favorites
          fav_array.push(id)
          this.setState({ favorites: fav_array })
        })
        .catch((errors) => this.setState({ errors: errors }))
    } else {
      userData.deleteFavorites(this.props.id, id)
        .then((result) => {
          console.log("i am herer")
          let index = this.state.favorites.indexOf(id)
          let fav_array = this.state.favorites
          fav_array.splice(index, 1)
          this.setState({ favorites: fav_array })
        })
        .catch((errors) => this.setState({ errors: errors }))
    }
  }

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  _handleSubmit = (e) => {
    userData.sendMessages(this.props.id, this.state.to_user, this.state.content)
      .then(() => {
        console.log("ok")
      })
      .catch((errors) => this.setState({ errors: errors }))
      this.toggleModal()
  }

  _handleChange = (e) => {
    let to_user = e.target.getAttribute('data-key')
    to_user = parseInt(to_user)
    this.setState({ content: e.target.value, to_user: to_user })
  }

  _onClick(personClicked){
    console.log("clicked the Thumbnail", personClicked);
    const state = this.state;
    this.setState(...state, {personClicked: personClicked})
    console.log("state ", this.state);
  }

  render() {
    if (!this.props.email) {
      return (<Row className='usersWithMapsRow'>
        <h2>Please<Link to='/api/signup'> Signup</Link> or<Link to='/api/login'> Login</Link> first!</h2>
      </Row>)
    } else {
    return (<Grid className='usersWithMapsGrid'>
      <Row className='usersWithMapsRow'>
        <Col xs={12} md={6} className='usersWithMapsCol'>
          <Users className='usersWithMapsElement' id={this.props.id} email={this.props.email} person={this._onClick.bind(this)}/>
        </Col>
        <Col xs={12} md={6} className='usersWithMapsCol'>
          <Map className='usersWithMapsElement' marker={this.state.scrollData} personClicked={this.state.personClicked} zoom={12}/>
        </Col>
      </Row>
      </Grid>
    )
  }
  }
}

export default UsersWithMaps;