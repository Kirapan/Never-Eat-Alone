import React from 'react'
import { Link, Switch, Route } from 'react-router-dom'
import Resource from '../models/resource'
import Maps from './Map';
import Messagebox2 from './Messagebox2'
import { Grid, Row, Col, Alert, DropdownButton, MenuItem, ButtonToolbar, Thumbnail, Button, Modal, FormGroup, ControlLabel, FormControl } from 'react-bootstrap'

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
      reply_name:""
    }
  }

  componentWillMount() {
    userData.findAll()
      .then((result) => {
        console.log("find alllllll???", result)
        const state = this.state;
        this.setState(...state, { lists: result })
        console.log("iam listtttttt", this.state.lists)
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

  toggleModal = (e) => {
    if (!this.state.isOpen) {
      let id = e.target.getAttribute('data-keyid')
      id = parseInt(id)
      let name = e.target.getAttribute('data-keyname')
      this.setState({
        isOpen: !this.state.isOpen,
        reply_id :id,
        reply_name: name
      });
    } else {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }
  }

  _handleSubmit = (e) => {
    userData.sendMessages(this.props.id, this.state.reply_id, this.state.content)
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

  render() {
    let newList = []
    this.state.lists.filter((list) => {
      if (this.state.favorites.includes(list.id)) {
        newList.push(list)
      }
    })
    console.log(newList)

    const displayImage = newList.map((prof, idx) => {
      return (<Col xs={3} md={3}>
        <Thumbnail src={prof.image} alt="242x200" >
          <h5><strong>{prof.name}</strong></h5>
          <h6>Industry: {prof.industry}</h6>
          <h6>Offers: {prof.offers[0]}, {prof.offers[1]},{prof.offers[2]} </h6>
          {this.state.favorites.indexOf(prof.id) < 0 ?
            (<Button bsStyle="primary" data-key={prof.id} onClick={this._handleLike.bind(this)}>Like</Button>) :
            (<Button bsStyle="danger" data-key={prof.id} onClick={this._handleLike.bind(this)}>Liked</Button>)}
          <Button data-keyid={prof.id} data-keyname={prof.name} bsStyle="default" onClick={this.toggleModal.bind(this)}>Invite</Button>
        </Thumbnail>
      </Col >)
    })

    if (!this.props.email) {
      return (<Row>
        <h2>Please<Link to='/api/signup'> Signup</Link> or<Link to='/api/login'> Login</Link> first!</h2>
      </Row>)
    } else {
      return (<Grid>
        <Row>
          {displayImage}
        </Row>
        <Modal show={this.state.isOpen}
            onHide={this.toggleModal.bind(this)} style={ {zIndex: 1200}}>
            <Modal.Header closeButton>
              <Modal.Title>Reply to {this.state.reply_name}</Modal.Title>
            </Modal.Header>
              <Modal.Body>
                <FormGroup controlId="formControlsTextarea">
                  <ControlLabel>Message:</ControlLabel>
                  <FormControl componentClass="textarea" placeholder="Say something..." onChange={this._handleChange.bind(this)} />
                </FormGroup>
              </Modal.Body>

              <Modal.Footer>
                <Button onClick={this._handleSubmit.bind(this)}>Send</Button>
              </Modal.Footer>
          </Modal>
        <Row>
          {this.state.loadMore ?
            <Button onClick={this.loadMore} style={{ display: 'flex', justifyContent: 'center' }}>Load More!</Button> :
            <Alert bsStyle="warning"><strong>No more profiles</strong></Alert>}
        </Row>
      </Grid>)
    }
  }
}

export default Favorites
