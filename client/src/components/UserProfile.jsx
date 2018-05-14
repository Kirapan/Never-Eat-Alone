/* eslint-disable no-undef */
/* global google */

import React from 'react'
import { Link } from 'react-router-dom'
import Resource from '../models/resource'
import { Grid, Row, Col } from 'react-bootstrap'
import Geosuggest from 'react-geosuggest'

const userData = Resource('users')

class userProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: (this.props.match.params.id || null),
      profile: {},
      industries: [],
      file: '',
      imagePreviewUrl: ''
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

  // _handleImageSubmit = (e) => {
  //   const newProfile = { ...this.state.profile, image: this.state.imagePreviewUrl, file: this.state.file }
  //   this.setState({ profile: newProfile })
  // }

  _handleCompanyChange = e => {
    const newProfile = { ...this.state.profile, company: e.target.value }
    this.setState({ profile: newProfile })
  }

  // _handleImageUrl= e => {
  //   const newProfile = { ...this.state.profile, image: e.target.value }
  //   this.setState({ profile: newProfile })
  // }

  onSuggestSelect = suggest => {
    if (!suggest) return
    console.log("i am suggest", suggest)
    const newProfile = { ...this.state.profile, lat: suggest.location.lat, lng: suggest.location.lng, address: suggest.description }
    this.setState({ profile: newProfile })
  }

  // _handleImageChange = e => {
  //   e.preventDefault();
  //   let reader = new FileReader();
  //   let file = e.target.files[0];

  //   reader.onloadend = (evt) => {
  //     //localStorage.setItem("img", reader.result)
  //     this.setState({
  //       file: file,
  //       imagePreviewUrl: reader.result
  //     });
  //   }

  //   reader.readAsDataURL(file)
  // }

  render() {
    const id = this.state.userId
    const industries = this.state.industries.map(industry => {
      return (<option key={industry.id} value={industry.title}>{industry.title}</option>)
    })

    // let { imagePreviewUrl } = this.state;
    // //imagePreviewUrl = localStorage.getItem("img")
    // let $imagePreview = null;
    // if (imagePreviewUrl) {
    //   $imagePreview = (<img src={imagePreviewUrl} alt='' height="100" width="100" />);
    // }

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
                <div>
                  Image
                {/* <input value={this.state.profile.image} placeholder="Copy paste your image url here" onChange={this._handleImageUrl}/> */}
                  {/* <input type="file" onChange={this._handleImageChange} /> */}
                  {/* <button type="button" onClick={this._handleImageSubmit}>Upload Image</button> */}
                  {/* {$imagePreview} */}
                  <img src={this.state.profile.image} alt='' height="100" width="100" />
                </div>
              </label>
              <label>
                Name
             <input type="text" value={this.state.profile.name} name="name" onChange={this._handleNameChange} />
              </label>
              <label>
                Email
             <input value={this.state.profile.email} disabled={true} />
              </label>
              {/* <label>
                Password
             <input type="password" value={this.state.profile.password} />
              </label> */}
              <label>
                Industry
          <select value={this.state.profile.title} name="Industry" onChange={this._handleIndustryChange} >
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
                  onSuggestSelect={this.onSuggestSelect}
                  location={new google.maps.LatLng(43.6, -79.3)}
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
