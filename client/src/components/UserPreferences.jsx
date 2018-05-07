import React from 'react'
import { Link } from 'react-router-dom'
import Resource from '../models/resource'
import { Grid, Row, Col } from 'react-bootstrap'

const userData = Resource('users')

class UserPreferences extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: (this.props.match.params.id || null),
      industries: [],
      user_industries: [],
      offers_needs: [],
      offers: [],
      needs: []
    }
  }

  componentWillMount() {

    userData.findOffersNeeds()
      .then((result) => {
        this.setState({ offers_needs: result })
      })
      .catch((errors) => this.setState({ errors: errors }))

    userData.findUserIndustries(this.state.userId)
      .then((result) => {
        this.setState({ user_industries: result })
      })
      .catch((errors) => this.setState({ errors: errors }))

    userData.findIdustries()
      .then((result) => {
        this.setState({ industries: result })
      })
      .catch((errors) => this.setState({ errors: errors }))

    userData.findUserNeeds(this.state.userId)
      .then((result) => {
        this.setState({ needs: result })
      })
      .catch((errors) => this.setState({ errors: errors }))

    userData.findUserOffers(this.state.userId)
      .then((result) => {
        this.setState({ offers: result })
      })
      .catch((errors) => this.setState({ errors: errors }))
  }

  _handleSubmit(event) {
    alert('submited')
    event.preventDefault();
  }

  _handleIndustryChange = e => {
    const newIndustry = e.target.value
    this.setState({ user_industries: newIndustry })
  }

  _handleNeedsChange = e => {
    const newNeeds = e.target.value
    this.setState({ needs: newNeeds })
  }

  _handleOffersChange = e => {
    const newOffers = e.target.value
    this.setState({ offers: newOffers })
  }

  render() {
    const id = this.state.userId
    const industries = this.state.industries.map(industry => {
      return (<option key={industry.id} value={industry.title}>{industry.title}</option>)
    })

    const offers_needs = this.state.offers_needs.map(item => {
      return (<option key={item.id} value={item.title}>{item.title}</option>)
    })

    return (
      <div>
        <Grid>
          <Row className="header">
            <Col xs={6} md={6}>
              <Link to={`/api/users/${id}`}>Your Profile</Link>
            </Col>
            <Col xs={6} md={6}>
              <Link to={`/api/users/${id}/preferences`}>Preferences</Link>
            </Col>
          </Row>
          <Row className="profile-content">
            <form onSubmit={this._handleSubmit}>
              <label>
                Interested Industries
          {this.state.user_industries.map(industry => {
                  return (<select value={industry.title} name={industry.id} onChange={this._handleIndustryChange}>{industries}</select>)
                })}
              </label>
              <label>
                What topics would you like to talk about?
          {this.state.needs.map(need => {
                  return (<select value={need.title} name={need.id} onChange={this._handleNeedsChange}>{offers_needs}</select>)
                })}
              </label>
              <label>
                What expertise could you offer?
          {this.state.offers.map(offer => {
                  return (<select value={offer.title} name={offer.id} onChange={this._handleOffersChange}>{offers_needs}</select>)
                })}
              </label>
              <input type="submit" value="Submit" />
            </form>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default UserPreferences
