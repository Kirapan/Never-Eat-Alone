import React from 'react'
import { Link } from 'react-router-dom'
import Resource from '../models/resource'
import { Grid, Row, Col, DropdownButton, MenuItem, ButtonToolbar, Thumbnail, Button } from 'react-bootstrap'

const userData = Resource('users')

class Users extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lists: [],
      industries: [],
      offers_needs: [],
      favorites:[]
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

  render() {

    const displayImage = this.state.lists.map((list, idx) => {
      return (<Col xs={3} md={4}>
        <Thumbnail src={list.image} alt="242x200" >
          <h3>{list.name}</h3>
          <p>{list.title}</p>
          <p>
            <Button bsStyle="primary">Like</Button>
            <Button bsStyle="default">Invite</Button>
          </p>
        </Thumbnail>
      </Col>)
    })

    if (!this.props.email) {
      return (<Row>
        <h2>Please<Link to='/api/signup'> Signup</Link> or<Link to='/api/login'> Login</Link> first!</h2>
      </Row>)
    } else {
      return (<Grid>
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
      </Grid>)
    }
  }
}

export default Users