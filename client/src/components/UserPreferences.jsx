import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import Resource from '../models/resource'
import { Grid, Row, Col ,Image} from 'react-bootstrap'

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
      needs: [],
      toProfiles: false,
      profile: {}
    }
  }

  componentWillMount() {
    userData.findUserProfile(this.state.userId)
      .then((result) => this.setState({
        profile: result,
        errors: null
      }))
      .catch((errors) => this.setState({ errors: errors }))

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
    this.setState({ toProfiles: true })
    let data = {
      user_industries: this.state.user_industries,
      offers: this.state.offers,
      needs: this.state.needs
    }
    userData.saveUserPreferences(this.state.userId, data)
      .then((result) => console.log("ok updated"))
      .catch((errors) => this.setState({ errors: errors }))
  }

  _handleIndustryChange = e => {
    const newIndustry = e.target.value
    let newArray = this.state.user_industries;
    newArray[e.target.getAttribute('data-key')] = { title: newIndustry }
    this.setState({ user_industries: newArray })
  }

  _handleNeedsChange = e => {
    const newNeeds = e.target.value
    let newArray = this.state.needs;
    newArray[e.target.getAttribute('data-key')] = { title: newNeeds }
    this.setState({ needs: newArray })
  }

  _handleOffersChange = e => {
    const newOffers = e.target.value
    let newArray = this.state.offers;
    newArray[e.target.getAttribute('data-key')] = { title: newOffers }
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

    if (this.state.toProfiles === true) {
      return <Redirect to='/api/maps' />
    }

    return (
      <div className='usersWithMapsRow'>
        <Grid>
          <Row className="header">
            <nav aria-label="...">
              <ul class="pager">
                <li> <Link to={`/api/users/${id}`}>Your Profile</Link></li>
                <li>   <Link to={`/api/users/${id}/preferences`}>Preferences</Link></li>
              </ul>
            </nav>
          </Row>
          <Row className="profile-content">
          <div>
              <img className="profile-background" src="http://hdwallpaperbackgrounds.net/wp-content/uploads/2015/09/Download-Largest-Collection-of-Space-HD-Desktop-Wallpapers.jpg" alt="background" />
              <Image className="profile-pic" src={this.state.profile.image} alt='' height="160" width="160" circle />
            </div>
            <br />
            <form className="profile-form" onSubmit={this._handleSubmit.bind(this)}>
              <div class="input-group">
                <span bsStyle="info" class="input-group-addon" id="sizing-addon2">
                  Interested Industries</span>
                {this.state.user_industries.map((industry, i) => {
                  return (<select class="form-control" aria-describedby="sizing-addon2" value={industry.title} data-key={i} onChange={this._handleIndustryChange}>{industries}</select>)
                })}
              </div>
              <br/>
              <div class="input-group">
                <span bsStyle="info" class="input-group-addon" id="sizing-addon2">
                Pick 3 topics you would like to know</span>
          {this.state.needs.map((need, i) => {
                  return (<select class="form-control" aria-describedby="sizing-addon2" value={need.title} data-key={i} onChange={this._handleNeedsChange}>{offers_needs}</select>)
                })}
            </div>
            <br/>
            <div class="input-group">
                <span bsStyle="info" class="input-group-addon" id="sizing-addon2">
                Pick 3 expertise you could offer</span>
          {this.state.offers.map((offer, i) => {
                  return (<select class="form-control" aria-describedby="sizing-addon2"value={offer.title} data-key={i} onChange={this._handleOffersChange}>{offers_needs}</select>)
                })}
              </div>
              <br/>
              <input id="profile-button" type="submit" value="Search!" />

            </form>
            <br/>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default UserPreferences
