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
      offers_needs: [],
      user_industries: [],
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

  _handleSubmit = event => {
    event.preventDefault();
    let data = {
      user_industries: this.state.user_industries,
      offers: this.state.offers,
      needs: this.state.needs
    }
    userData.saveUserPreferences(this.state.userId, data)
      .then((result) => this.props.history.push(`/api/users/${this.state.userId}/matches`))
      .catch((errors) => this.setState({ errors: errors }))
  }

  _handleIndustryChange = e => {
    const newIndustry = e.target.value
    let newArray = this.state.user_industries;
    newArray[e.target.getAttribute('data-key')] = {title :newIndustry}
    this.setState({ user_industries: newArray })
  }

  _handleNeedsChange = e => {
    const newNeeds = e.target.value
    let newArray = this.state.needs;
    newArray[e.target.getAttribute('data-key')] ={ title:newNeeds }
    this.setState({ needs: newArray })
  }

  _handleOffersChange = e => {
    const newOffers = e.target.value
    let newArray = this.state.offers;
    newArray[e.target.getAttribute('data-key')] ={title: newOffers}
    this.setState({ offers: newArray })
  }

  render() {
    const id = this.state.userId
    const industries = this.state.industries.map(industry => {
      return (<option value={industry.title}>{industry.title}</option>)
    })

    const offers_needs = this.state.offers_needs.map(item => {
      return (<option value={item.title}>{item.title}</option>)
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
          {this.state.user_industries.map((industry, i) => {
                  return (<select value={industry.title} data-key={i} onChange={this._handleIndustryChange}>{industries}</select>)
                })}
              </label>
              <label>
                What topics would you like to talk about?
          {this.state.needs.map((need, i) => {
                  return (<select value={need.title} data-key={i} onChange={this._handleNeedsChange}>{offers_needs}</select>)
                })}
              </label>
              <label>
                What expertise could you offer?
          {this.state.offers.map((offer, i) => {
                return (<select value={offer.title} data-key={i} onChange={this._handleOffersChange}>{offers_needs}</select>)
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
