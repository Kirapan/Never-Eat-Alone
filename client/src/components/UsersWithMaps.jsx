import React, { Component } from 'react';
import { Grid, Row, Col, Alert, DropdownButton, MenuItem, ButtonToolbar, Thumbnail, Button } from 'react-bootstrap'
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
    const displayImage = this.state.scrollData.map((scroll, idx) => {
      //console.log("in Thumbnail", list);
      return (<Col xs={3} md={6}>
        <Thumbnail src={scroll.image} alt="242x200" id={scroll.id} onClick={this._onClick.bind(this, scroll)}>
          <h5><strong>{scroll.name}</strong></h5>
          <h6>Industry: {scroll.industry}</h6>
          <h6>Offers: {scroll.offers[0]}, {scroll.offers[1]},{scroll.offers[2]} </h6>
          <Button bsStyle="primary">Like</Button>
          <Button bsStyle="default">Invite</Button>
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
              title={this.state.filter.industry? this.state.filter.industry : "industry"}
              id='dropdown-basic-industry'
            >
              {this.state.industries.map((industry, idx) => {
                return <MenuItem eventKey={industry.title} onSelect={this._handleIndustrySelect.bind(this)}>{industry.title}</MenuItem>
              })}
              <MenuItem eventKey="" onSelect={this._handleIndustrySelect.bind(this)}>All</MenuItem>
            </DropdownButton>

            <DropdownButton
              bsStyle='warning'
              title={this.state.filter.offer? this.state.filter.offer :'Offers'}
              id='dropdown-basic-offers'
            >
              {this.state.offers_needs.map((item, idx) => {
                return <MenuItem eventKey={item.title} onSelect={this._handleOfferSelect.bind(this)}>{item.title}</MenuItem>
              })}
              <MenuItem eventKey="" onSelect={this._handleOfferSelect.bind(this)}>All</MenuItem>
            </DropdownButton>

            {/* <DropdownButton
              bsStyle='info'
              title='Location'
              id='dropdown-basic-location'
            >
              <MenuItem eventKey="idx">Less than 2km</MenuItem>
              <MenuItem eventKey="idx">Less than 5km</MenuItem>
              <MenuItem eventKey="idx">More than 5km</MenuItem>
            </DropdownButton> */}
          </ButtonToolbar>
          </Row>
          <br/>
          <Row>
            {displayImage}
          </Row>
          <Row>
          {this.state.loadMore ?
            <Button onClick={this.loadMore} style={{ display: 'flex', justifyContent: 'center' }}>Load More!</Button> :
            <Alert bsStyle="warning"><strong>No more profiles</strong></Alert>}
        </Row>
        </Col>
        <Col xs={12} md={6}>
          <br/>
          <br/>
          <br/>
          <Row>
            <Map marker={this.state.scrollData} personClicked={this.state.personClicked} zoom={12}/>
          </Row>
        </Col>
      </Row>
      </Grid>
    )
  //}
  }
}

export default UsersWithMaps;