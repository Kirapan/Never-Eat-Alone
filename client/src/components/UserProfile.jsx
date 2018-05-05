import React from 'react'
import {Link} from 'react-router-dom'
import Resource from '../models/resource'
import {Grid, Row, Col} from 'react-bootstrap'

const userData = Resource('users')

class userProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: (this.props.match.params.id || null),
      profile:{}
    }
  }

  componentWillMount() {
    userData.findUserProfile(this.state.userId)
    .then((result) => this.setState({
      profile: result,
      errors: null
    }))
    .catch((errors) => this.setState({errors: errors}))
  }

  _handleSumbit(event) {
    alert('submited')
    event.preventDefault();
  }

  render() {
    const id = this.state.userId

    return (
      <div>
        <Grid>
          <Row className="header">
            <Col xs={6} md={6}>
              <Link to={`/api/users/${id}`}>Your Profile</Link>
            </Col>
            <Col xs={6} md={6}>
              <Link to={`/api/users/${id}`}>Preference</Link>
            </Col>
          </Row>
          <Row className="profile-content">
          <form onSubmit={this._handleSubmit}>
           <label>
             Name
             <input  value={this.state.profile.name} />
           </label>
           <label>
             Email
             <input  value={this.state.profile.email} disabled={true} />
           </label>
           <label>
          Industry
          <select value={this.state.profile.industry} >
            <option value="grapefruit">Grapefruit</option>
          </select>
        </label>
        <label>
          Company
          <input  value={this.state.profile.company}/>
        </label>
        <label>
          Company Address
          <input  value={this.state.profile.location}/>
        </label>
           <input type="submit" value="Submit" />
         </form>
  </Row>
</Grid>
      </div>
    )
  }
}

export default userProfile
