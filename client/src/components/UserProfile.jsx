import React from 'react'
import {Redirect} from 'react-router-dom'

import Resource from '../models/resource'
const userData = Resource('users')

class userProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: (this.props.match.params.id || null),
      name: '',
      email: userData.email,
      image: '',
      industry:'',
      company:'',
      location:'',
      show: false,
      redirect: ''
    }
  }

  componentWillMount() {
    console.log("inside userProfile");
    if (!this.state.userId) return
    userData.findUserProfile(this.state.userId)
    .then((result) => this.setState({
      product: result,
      errors: null,
      show: true,
      redirect: ''
    }))
    .catch((errors) => this.setState({errors: errors}))
  }

  render() {
    console.log("in render userProfile");
    //if (this.state.redirect) return <Redirect to={this.state.redirect} />
    //<p> Hello there</p>
    return (
      <div>
          <span>Hello there{this.props.value.name}</span>
      </div>
    )
  }
}

export default userProfile
