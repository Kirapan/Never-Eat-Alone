/* eslint-disable no-undef */
/* global google */

import React from 'react'
import { Link } from 'react-router-dom'
import Resource from '../models/resource'
import { Grid, Row, Col, Panel, Image } from 'react-bootstrap'
import Geosuggest from 'react-geosuggest'
import '../styles/css/geo-suggest.css'

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
    if (!this.state.profile.address || !this.state.profile.company) {
      alert('Company Name and/or Company Address is required!')
    } else {
      userData.saveUserProfile(this.state.userId, this.state.profile)
        .then((result) => this.props.history.push(`/api/users/${this.state.userId}/preferences`))
        .catch((errors) => this.setState({ errors: errors }))
    }
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
    suggest = ""
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
            <nav aria-label="...">
              <ul class="pager">
                <li> <Link to={`/api/users/${id}`}>Your Profile</Link></li>
                <li>   <Link to={`/api/users/${id}/preferences`}>Preferences</Link></li>
              </ul>
            </nav>
          </Row>
          <Row className="profile-content">


            <div>
              {/* <input value={this.state.profile.image} placeholder="Copy paste your image url here" onChange={this._handleImageUrl}/> */}
              {/* <input type="file" onChange={this._handleImageChange} /> */}
              {/* <button type="button" onClick={this._handleImageSubmit}>Upload Image</button> */}
              {/* {$imagePreview} */}
              <img className="profile-background" scr="../img/profileback.jpg" />
              <Image className="profile-pic" src={this.state.profile.image} alt='' height="120" width="120" circle />
            </div>
            <br />

            <form className="profile-form" onSubmit={this._handleSubmit}>
              <div class="input-group">
                <span bsStyle="info" class="input-group-addon" id="sizing-addon2">Name</span>
                <input type="text" class="form-control" aria-describedby="sizing-addon2" value={this.state.profile.name} name="name" onChange={this._handleNameChange} />
              </div>
              <br />
              <div class="input-group">
                <span class="input-group-addon" id="sizing-addon2">Email</span>
                <input type="text" class="form-control" aria-describedby="sizing-addon2" value={this.state.profile.email} disabled={true} />
              </div>
              <br />

              {/* <label>
                Password
             <input type="password" value={this.state.profile.password} />
              </label> */}
              <div class="input-group">
                <span class="input-group-addon" id="sizing-addon2">
                  Industry</span>
                <select class="form-control" aria-describedby="sizing-addon2" value={this.state.profile.title} name="Industry" onChange={this._handleIndustryChange} >
                  {industries}
                </select>
              </div>
              <br />
              <div class="input-group">
                <span class="input-group-addon" id="sizing-addon2">
                  Company</span>
                <input class="form-control" aria-describedby="sizing-addon2" value={this.state.profile.company} name="company" onChange={this._handleCompanyChange} />
              </div>
              <br />
              <div class="input-group">
                <span class="input-group-addon" id="sizing-addon2">
                  Company Address</span>
                <Geosuggest
                  class="form-control" aria-describedby="sizing-addon2"
                  ref={el => this._geoSuggest = el}
                  initialValue={this.state.profile.address}
                  onSuggestSelect={this.onSuggestSelect}
                  location={new google.maps.LatLng(43.6, -79.3)}
                  radius="20" />
              </div>
              <br />
              <input id="profile-button" type="submit" value="Save and Continue" />
            </form>
            <br />
          </Row>
        </Grid>
      </div>)
  }
}

export default userProfile
