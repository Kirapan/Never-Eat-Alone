/* eslint-disable no-undef */
/* global google */

import React from 'react'
import { Link } from 'react-router-dom'
import Resource from '../models/resource'
import { Grid, Row, Col } from 'react-bootstrap'
import Geosuggest from 'react-geosuggest';


const userData = Resource('users')

class userProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: (this.props.match.params.id || null),
      profile: {},
      industries: []
    }
  }

  componentWillMount() {
    userData.findUserProfile(this.state.userId)
      .then((result) => this.setState({
        profile: result,
        errors: null
      }))
      .catch((errors) => this.setState({ errors: errors }))

    userData.findIdustries()
      .then((result) => {
        this.setState({ industries: result })
      })
      .catch((errors) => this.setState({ errors: errors }))
  }

  _handleSubmit = e => {
    e.preventDefault();
    userData.saveUserProfile(this.state.userId, this.state.profile)
      .then((result) => this.props.history.push(`/api/users/${this.state.userId}/preferences`))
      .catch((errors) => this.setState({ errors: errors }))
  }

  _handleNameChange = e => {
    const newProfile = { ...this.state.profile, name: e.target.value }
    this.setState({ profile: newProfile })
  }

  _handleIndustryChange = e => {
    const newProfile = { ...this.state.profile, title: e.target.value }
    this.setState({ profile: newProfile })
  }

  _handleImageChange = e => {
    const newProfile = { ...this.state.profile, image: e.target.value }
    this.setState({ profile: newProfile })
  }

  _handleCompanyChange = e => {
    const newProfile = { ...this.state.profile, company: e.target.value }
    this.setState({ profile: newProfile })
  }

  onSuggestSelect = suggest => {
    if (!suggest) return
    const newProfile = { ...this.state.profile, coordinates: suggest.location, location: suggest.description }
    this.setState({ profile: newProfile })
  }

  render() {
    const id = this.state.userId
    const industries = this.state.industries.map(industry => {
      return (<option key={industry.id} value={industry.title}>{industry.title}</option>)
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
                Name
             <input type="text" value={this.state.profile.name} name="name" onChange={this._handleNameChange} />
              </label>
              <label>
                Email
             <input value={this.state.profile.email} disabled={true} />
              </label>
              <label>
                Password
             <input type="password" value={this.state.profile.password} />
              </label>
              <label>
                Image
             <input value={this.state.profile.image} onChange={this._handleImageChange} />
              </label>
              <label>
                Industry
          <select value={this.state.profile.title} name="industry" onChange={this._handleIndustryChange} >
                  {industries}
                </select>
              </label>
              <label>
                Company
          <input value={this.state.profile.company} name="company" onChange={this._handleCompanyChange} />
              </label>
              <label>
                Company Address
                <Geosuggest
                  ref={el => this._geoSuggest = el}
                  initialValue={this.state.profile.location}
                  //onChange={this._handleLocationChange}
                  onSuggestSelect={this.onSuggestSelect}
                  location={new google.maps.LatLng(53.558572, 9.9278215)}
                  radius="20" />
              </label>
              <input type="submit" value="Save and Continue" />
            </form>
          </Row>
        </Grid>
      </div>)
  }
}

export default userProfile
