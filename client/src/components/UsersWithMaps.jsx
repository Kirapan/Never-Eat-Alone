import React, { Component } from 'react';
import { Grid, Row, Col, DropdownButton, MenuItem, ButtonToolbar, Thumbnail, Button } from 'react-bootstrap'
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom'
import Resource from '../models/resource'
import Users from './Users';
import Map from './Map';

const userData = Resource('users')

export class UsersWithMaps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: [],
      industries: [],
      offers_needs: [],
      favorites:[],
      personClicked: ''
    }
  }

  componentWillMount() {
    userData.findAll()
      .then((result) => {
        this.setState({
          lists: result,
          errors: null
        })
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

  componentDidUpdate(prevProps, prevState) {
    console.log("componentDidUpdate");
  }

  componentDidMount() {
    console.log("componentDidMount");
  }

  _onClick(personClicked){
    console.log("clicked the Thumbnail", personClicked);
    const state = this.state;
    this.setState(...state, {personClicked: personClicked})
    console.log("state ", this.state);
  }

  render() {
    const displayImage = this.state.lists.map((list, idx) => {
      //console.log("in Thumbnail", list);
      return (<Col xs={3} md={6}>
        <Thumbnail src={list.image} alt="242x200" id={list.id} onClick={this._onClick.bind(this, list)}>
          <h3>{list.name}</h3>
          <p>{list.title}</p>
          <p>
            <Button bsStyle="primary">Like</Button>
            <Button bsStyle="default">Invite</Button>
          </p>
        </Thumbnail>
      </Col>)
    })

    //if (!this.props.email) {
    //  return (<Row>
    //    <h2>Please<Link to='/api/signup'> Signup</Link> or<Link to='/api/login'> Login</Link> first!</h2>
    //  </Row>)
    //} else {
    return (
      <Grid>
        <Row top="xs">
        <Col xs={12} md={6}>
          <Row>
            <ButtonToolbar>
              <DropdownButton
                bsStyle='primary'
                title='Industry'
                id='dropdown-basic-industry'
              >
                {this.state.industries.map((industry, idx) => {
                  return <MenuItem eventKey="idx">{industry.title}</MenuItem>
                })}
              </DropdownButton>

              <DropdownButton
                bsStyle='warning'
                title='Offers'
                id='dropdown-basic-offers'
              >
                {this.state.offers_needs.map((item, idx) => {
                  return <MenuItem eventKey="idx">{item.title}</MenuItem>
                })}
              </DropdownButton>

              <DropdownButton
                bsStyle='info'
                title='Location'
                id='dropdown-basic-location'
              >
                <MenuItem eventKey="idx">Less than 2km</MenuItem>
                <MenuItem eventKey="idx">Less than 5km</MenuItem>
                <MenuItem eventKey="idx">More than 5km</MenuItem>
              </DropdownButton>
            </ButtonToolbar>
          </Row>
          <br/>
          <Row>
            {displayImage}
          </Row>
        </Col>
        <Col xs={12} md={6}>
          <br/>
          <br/>
          <br/>
          <Row>
            <Map marker={this.state.lists} personClicked={this.state.personClicked}/>
          </Row>
        </Col>
      </Row>
      </Grid>
    )
  //}
  }
}

export default UsersWithMaps;